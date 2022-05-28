import { Button, Card } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
const { Meta } = Card;

function MyNftItem(props: any) {
  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={props.imageUrl} layout="fill" />}
      >
        <Meta title={props.name} description={props.status} />
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
