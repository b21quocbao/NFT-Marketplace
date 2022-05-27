import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
import { useWeb3React } from "@web3-react/core";
import { Button } from "antd";
// import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import StorageUtils from "../../utils/storage";
import { useEagerConnect, useInactiveListener } from "../wallet/Hooks";
import web3 from "web3";

const { fromWei } = web3.utils;

function OfferItem(props: any) {
  const context = useWeb3React();
  const { library, active, connector } = context;
  const [user, setUser] = useState({} as any);

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

  return (
    <>
      <p>{`Bidder: ${props.offer.maker}`}</p>
      <p>{`Amount: ${fromWei(props.offer.erc20TokenAmount)}`}</p>
      {props.makerUserId == user.id &&
        props.highestBid &&
        new Date(props.endAuctionTime).getTime() < Date.now() && (
          <Button
            href="Confirm"
            onClick={async (e) => {
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
                process.env.NEXT_PUBLIC_CHAIN_ID
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
              console.log(fillTx, "fillTx");

              const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(
                fillTx.hash
              );
              console.log(fillTxReceipt, "fillTxReceipt");
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
