import { Col, Row } from "antd";
import MyNftItem from "./MyNftItem";

function MyNftList(props: any) {
  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      {props.nfts.map((nft: any) => (
        <Col
          className="gutter-row"
          span={6}
          xs={24}
          sm={12}
          xl={6}
          key={nft.id}
        >
          <MyNftItem
            key={nft.id}
            id={nft.id}
            imageUrl={nft.imageUrl}
            name={nft.name}
            address={nft.address}
            endAuctionTime={nft.endAuctionTime}
            status={nft.status}
            chainId={nft.chainId}
            signedOrder={nft.signedOrder}
          />
        </Col>
      ))}
    </Row>
  );
}

export default MyNftList;
