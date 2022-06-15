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
              setLoading(true)
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
