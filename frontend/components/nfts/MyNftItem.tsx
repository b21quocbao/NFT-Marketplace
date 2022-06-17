import { Button, Card, Image } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CHAIN_DATA } from "../../constants/chain";
const { Meta } = Card;

function MyNftItem(props: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        <p>{CHAIN_DATA[props.chainId]?.name}</p>
        <br />
        {props.status == "AVAILABLE" && (
          <>
            <Button
              type="primary"
              style={{ margin: "auto" }}
              href={`/nfts/sale/${props.id}`}
            >
              Sale
            </Button>
            <br />
            <br />
            <Button
              type="primary"
              style={{ margin: "auto" }}
              href={`/nfts/auction/${props.id}`}
            >
              Auction
            </Button>
            <br />
            <br />
          </>
        )}
        {props.status == "AUCTION" && (
          <>
            <Button
              type="primary"
              style={{ margin: "auto" }}
              href={`/nfts/offers/${props.id}`}
            >
              View Offers
            </Button>
            <br />
            <br />
          </>
        )}
        {(props.status == "LIST" || props.status == "AUCTION") && (
          <>
            <Button
              type="primary"
              style={{ margin: "auto" }}
              loading={loading}
              onClick={async () => {
                setLoading(true);
                await fetch("/api/update-nft", {
                  method: "PUT",
                  body: JSON.stringify({
                    id: props.id,
                    status: "AVAILABLE",
                    signedOrder: null,
                    startingPrice: null,
                    startAuctionTime: null,
                    endAuctionTime: null,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                router.reload();
              }}
            >
              Cancel
            </Button>
            <br />
            <br />
          </>
        )}
        <Button
          type="primary"
          style={{ margin: "auto" }}
          onClick={() => {
            console.log(
              `${CHAIN_DATA[props.chainId]?.blockExplorerUrl}/token/${
                CHAIN_DATA[props.chainId]?.erc721
              }?a=${props.tokenId}`
            );

            window.open(
              `${CHAIN_DATA[props.chainId]?.blockExplorerUrl}/token/${
                CHAIN_DATA[props.chainId]?.erc721
              }?a=${props.tokenId}`,
              "_blank"
            );
          }}
        >
          View NFT
        </Button>
      </Card>
      <br />
    </>
  );
}

export default MyNftItem;
