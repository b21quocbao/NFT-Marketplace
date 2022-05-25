import { Button, Card } from "antd";
import Link from "next/link";
const { Meta } = Card;

function MyNftItem(props: any) {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src={props.imageUrl} layout='fill' />}
    >
      <Meta title={props.name} description={props.status} />
      <br />
      <Button type="primary" style={{ margin: 'auto' }} href={`/nfts/sale/${props.id}`}>Sale</Button>
    </Card>
  );
}

export default MyNftItem;
