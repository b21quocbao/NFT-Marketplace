import { useWeb3React } from "@web3-react/core";
import { Button, Card, Image } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CHAINS } from "../../constants/chain";
import { zeroContractAddresses } from "../../contracts/zeroExContracts";
import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
const { Meta } = Card;

function MyNftItem(props: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const context = useWeb3React();
  const { library, active, connector, chainId } = context;

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    console.log("running");
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<Image alt="example" src={props.imageUrl} />}
      >
        <Meta title={props.name} description={props.status} />
        <br />
        <b>Chain: </b>
        <p>{CHAINS[props.chainId]}</p>
        <br />
        {props.status == "AVAILABLE" && (
          <Button
            type="primary"
            style={{ margin: "auto" }}
            href={`/nfts/sale/${props.id}`}
          >
            Sale
          </Button>
        )}
        <br />
        <br />
        {props.status == "AVAILABLE" && (
          <Button
            type="primary"
            style={{ margin: "auto" }}
            href={`/nfts/auction/${props.id}`}
          >
            Auction
          </Button>
        )}
        {props.status == "LIST" && (
          <Button
            type="primary"
            style={{ margin: "auto" }}
            loading={loading}
            onClick={async() => {
              const signer = library.getSigner();
              setLoading(true)
              const nftSwapSdk = new NftSwap(
                library,
                signer,
                props.chainId,
                {
                  zeroExExchangeProxyContractAddress: zeroContractAddresses[
                    Number(chainId)
                  ]
                    ? zeroContractAddresses[Number(chainId)]
                    : undefined,
                }
              );
              if (props.signedOrder) {
                await nftSwapSdk.cancelOrder(props.signedOrder.nonce, 'ERC721');
              }
              if (props.usdSignedOrder) {
                await nftSwapSdk.cancelOrder(props.usdSignedOrder.nonce, 'ERC721');
              }
              await fetch("/api/update-nft", {
                method: "PUT",
                body: JSON.stringify({
                  id: props.id,
                  status: "AVAILABLE",
                  signedOrder: null,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              router.reload()
            }}
          >
            Cancel
          </Button>
        )}
        {props.status == "AUCTION" && (
          <Button
            type="primary"
            style={{ margin: "auto" }}
            href={`/nfts/offers/${props.id}`}
          >
            View Offers
          </Button>
        )}
      </Card>
      <br />
    </>
  );
}

export default MyNftItem;
