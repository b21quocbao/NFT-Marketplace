import { Card } from "antd";
import Link from "next/link";
import { CHAINS } from "../../constants/chain";
const { Meta } = Card;

function CollectionItem(props: any) {
  return (
    <Link href={`/collections/nfts/${props.id}`}>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={props.imageUrl} layout="fill" />}
      >
        <Meta title={props.name} description={CHAINS[props.chainId]} />
      </Card>
    </Link>
  );
}

export default CollectionItem;
