import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
import { Button } from "antd";
// import { ObjectId } from "mongodb";
import { useState } from "react";
import web3 from "web3";
import { useRouter } from "next/router";
import { zeroContractAddresses } from "../../contracts/zeroExContracts";
import useConnectionInfo from "../../hooks/connectionInfo";

const { fromWei } = web3.utils;

function OfferItem(props: any) {
  const { user, library, chainId } = useConnectionInfo();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <p>{`Bidder: ${props.offer.maker}`}</p>
      <p>{`Amount: ${fromWei(props.offer.erc20TokenAmount)}`}</p>
      {user &&
        props.makerUserId == user.id &&
        props.highestBid &&
        new Date(props.endAuctionTime).getTime() < Date.now() && (
          <Button
            href="Confirm"
            loading={loading}
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);

              const { ethereum } = window;

              if (user.id && !user.solana && props.chainId != chainId) {
                try {
                  await ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [
                      {
                        chainId: `0x${Number(props.chainId).toString(16)}`,
                      },
                    ], // chainId must be in hexadecimal numbers
                  });
                  router.reload();
                  await new Promise((resolve) => setTimeout(resolve, 5000));
                } catch (e: any) {
                  if (e.code === 4902) {
                    window.alert(
                      `Please add chain with id ${props.nft.chainId} to your wallet then try again`
                    );
                  }
                }
              }

              const signer = library.getSigner();

              const takerAsset: any = {
                tokenAddress: props.offer.erc721Token,
                tokenId: props.offer.erc721TokenId,
                type: "ERC721",
              };

              const nftSwapSdk = new NftSwap(library, signer, chainId, {
                zeroExExchangeProxyContractAddress: zeroContractAddresses[
                  Number(chainId)
                ]
                  ? zeroContractAddresses[Number(chainId)]
                  : undefined,
              });

              // Check if we need to approve the NFT for swapping
              const approvalStatusForUserB =
                await nftSwapSdk.loadApprovalStatus(
                  takerAsset,
                  props.offer.taker
                );

              // If we do need to approve NFT for swapping, let's do that now
              if (!approvalStatusForUserB.contractApproved) {
                const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
                  takerAsset,
                  props.offer.taker
                );
                const approvalTxReceipt = await approvalTx.wait();
                console.log(
                  `Approved ${takerAsset.tokenAddress} contract to swap with 0x. TxHash: ${approvalTxReceipt.transactionHash})`
                );
              }

              const fillTx = await nftSwapSdk.fillSignedOrder(props.offer);

              const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(
                fillTx.hash
              );
              console.log(props.userId, "props.userId");

              await fetch("/api/update-nft", {
                method: "PUT",
                body: JSON.stringify({
                  id: props.id,
                  status: "AVAILABLE",
                  fillTxReceipt,
                  userId: props.userId,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              await fetch("/api/new-action", {
                method: "POST",
                body: JSON.stringify({
                  userId: user.id,
                  nftId: props.id,
                  name: "Confirm offer",
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              router.push(`/nfts/${user.id}`);
            }}
          >
            Confirm this offer
          </Button>
        )}
      <hr />
    </>
  );
}

export default OfferItem;
