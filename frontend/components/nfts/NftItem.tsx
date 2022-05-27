import { useWeb3React } from "@web3-react/core";
import { Button, Card } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEagerConnect, useInactiveListener } from "../wallet/Hooks";
import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
import StorageUtils from "../../utils/storage";
import Countdown from "react-countdown";
const { Meta } = Card;
import web3 from "web3";

const { fromWei } = web3.utils;

function NftItem(props: any) {
  console.log(props, "props");

  const context = useWeb3React();
  const { library, active, connector } = context;
  const [user, setUser] = useState({} as any);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    let { status } = props;
    const checkStatus = () => {
      if (status === 'AUCTION' && new Date(props.endAuctionTime).getTime() < Date.now()) {
        setStatus('AVAILABLE');
      }
    }
    checkStatus()
    const interval = setInterval(checkStatus, 1000)
    setUser(StorageUtils.getUser());
    return () => clearInterval(interval);
  }, [props]);

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
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={props.imageUrl} layout="fill" />}
      >
        <Meta title={props.name} description={status} />
        <br />
        {props.signedOrder && <b>{props.status == 'AVAILABLE' ? "Last Sale" : "Price"}</b>}
        {props.signedOrder && (
          <p>{fromWei(props.signedOrder.erc20TokenAmount) + " MATIC"}</p>
        )}
        {props.bidOrders && props.bidOrders.length && <b>{"Highest Offer"}</b>}
        {props.bidOrders && props.bidOrders.length && (
          <p>
            {fromWei(props.bidOrders[0].signedOrder.erc20TokenAmount) +
              " MATIC"}
          </p>
        )}
        {status === "AUCTION" &&
          (!(props.bidOrders &&
          props.bidOrders.length)) && <b>{"Starting Price"}</b>}
        {status === "AUCTION" &&
          (!(props.bidOrders &&
            props.bidOrders.length)) && (
            <p>
              {fromWei(props.startingPrice) +
                " MATIC"}
            </p>
          )}
        {status === "LIST" && user?.id !== props?.userId && (
          <Button
            type="primary"
            style={{ margin: "auto" }}
            onClick={async (e) => {
              const signer = library.getSigner();

              e.preventDefault();

              const takerAsset: any = {
                tokenAddress: props.signedOrder.erc20Token,
                amount: props.signedOrder.erc20TokenAmount,
                type: "ERC20",
              };

              const nftSwapSdk = new NftSwap(
                library,
                signer,
                process.env.NEXT_PUBLIC_CHAIN_ID
              );

              // Check if we need to approve the NFT for swapping
              const approvalStatusForUserB =
                await nftSwapSdk.loadApprovalStatus(takerAsset, user.address);
              // If we do need to approve NFT for swapping, let's do that now
              if (!approvalStatusForUserB.contractApproved) {
                const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
                  takerAsset,
                  user.address
                );
                const approvalTxReceipt = await approvalTx.wait();
                console.log(
                  `Approved ${takerAsset.tokenAddress} contract to swap with 0x. TxHash: ${approvalTxReceipt.transactionHash})`
                );
              }

              const fillTx = await nftSwapSdk.fillSignedOrder(
                props.signedOrder
              );
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
                  userId: user.id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }}
          >
            Buy
          </Button>
        )}
        {user && status === "AUCTION" && user?.id !== props?.userId && (
          <Button
            type="primary"
            style={{ margin: "auto" }}
            href={`/nfts/bid/${props.id}`}
          >
            Bid
          </Button>
        )}

        {status === "AUCTION" && (
          <>
            <b>Expiry Time: </b>
            <Countdown date={new Date(props.endAuctionTime).getTime()} />
          </>
        )}
        {status === "AUCTION" && (
          <>
            <br />
            <br />
            <Button
              type="primary"
              style={{ margin: "auto" }}
              href={`/nfts/offers/${props.id}`}
            >
              View Offers
            </Button>
          </>
        )}
      </Card>
      <br />
    </>
  );
}

export default NftItem;
