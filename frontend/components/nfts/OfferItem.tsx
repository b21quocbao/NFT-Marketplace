import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
import { useWeb3React } from "@web3-react/core";
import { Button } from "antd";
// import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import StorageUtils from "../../utils/storage";
import { useEagerConnect, useInactiveListener } from "../wallet/Hooks";
import web3 from "web3";
import { useRouter } from "next/router";

const { fromWei } = web3.utils;

function OfferItem(props: any) {
  const context = useWeb3React();
  const router = useRouter();
  const { library, active, connector, chainId } = context;
  const [user, setUser] = useState({} as any);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(StorageUtils.getUser());
  }, [library]);

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    console.log("running");
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);
  console.log(props.userId, 'props.userId');
  

  return (
    <>
      <p>{`Bidder: ${props.offer.maker}`}</p>
      <p>{`Amount: ${fromWei(props.offer.erc20TokenAmount)}`}</p>
      {props.makerUserId == user.id &&
        props.highestBid &&
        new Date(props.endAuctionTime).getTime() < Date.now() && (
          <Button
            href="Confirm"
            loading={loading}
            onClick={async (e) => {
              setLoading(true);
              const signer = library.getSigner();

              e.preventDefault();

              const takerAsset: any = {
                tokenAddress: props.offer.erc721Token,
                tokenId: props.offer.erc721TokenId,
                type: "ERC721",
              };

              const nftSwapSdk = new NftSwap(
                library,
                signer,
                chainId
              );

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
                  name: "Confirm offer"
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              router.push(`/nfts/${chainId}/${user.id}`);
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
