import { Button, Card } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
const { Meta } = Card;

function MyNftItem(props: any) {
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
    return () => clearInterval(interval);
  }, [props]);

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
        {status == 'AVAILABLE' && <Button
          type="primary"
          style={{ margin: "auto" }}
          href={`/nfts/sale/${props.id}`}
        >
          Sale
        </Button>}
        <br />
        <br />
        {status == 'AVAILABLE' && <Button
          type="primary"
          style={{ margin: "auto" }}
          href={`/nfts/auction/${props.id}`}
        >
          Auction
        </Button>}
      </Card>
      <br />
    </>
  );
}

export default MyNftItem;
