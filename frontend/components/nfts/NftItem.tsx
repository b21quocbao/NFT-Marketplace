import { useWeb3React } from "@web3-react/core";
import { Button, Card } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEagerConnect, useInactiveListener } from "../wallet/Hooks";
import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
import StorageUtils from "../../utils/storage";
const { Meta } = Card;

function NftItem(props: any) {
  console.log(props, "props");
  
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
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src={props.imageUrl} layout="fill" />}
    >
      <Meta title={props.name} description={props.status} />
      <br />
      {props.status === "LIST" && <Button
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
            process.env.NEXT_PUBLIC_CHAIN_ID,
          );

          // Check if we need to approve the NFT for swapping
          const approvalStatusForUserB = await nftSwapSdk.loadApprovalStatus(
            takerAsset,
            user.address
          );
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

          const fillTx = await nftSwapSdk.fillSignedOrder(props.signedOrder);
          console.log(fillTx, 'fillTx');
          
          const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx.hash);
          console.log(fillTxReceipt, "fillTxReceipt");
          await fetch("/api/update-nft", {
            method: "PUT",
            body: JSON.stringify({
              id: props.id,
              status: "COMPLETED",
              fillTxReceipt,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }}
      >
        Buy
      </Button>}
      {props.status !== "LIST" && <Button
        type="primary"
        style={{ margin: "auto" }}
        href={`/nfts/bid/${props.id}`}
      >
        Bid
      </Button>}
      {props.status !== "LIST" && <><br /><br /><Button
        type="primary"
        style={{ margin: "auto" }}
        href={`/nfts/offers/${props.id}`}
      >
        View Offers
      </Button></>}
    </Card>
  );
}

export default NftItem;
