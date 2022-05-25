import { Card } from "antd";
const { Meta } = Card;

function CollectionItem(props: any) {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src={props.imageUrl} layout='fill' />}
    >
      <Meta title={props.name} description={props.chain} />
    </Card>
  );
}

export default CollectionItem;
