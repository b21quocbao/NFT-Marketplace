import { Col, Row } from "antd";
import NftItem from "./NftItem";

function NftList(props: any) {
  
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
        <Col className="gutter-row" span={6} xs={24} sm={12} xl={6} key={nft.id}>
          <NftItem
            key={nft.id}
            id={nft.id}
            imageUrl={nft.imageUrl}
            name={nft.name}
            address={nft.address}
            userId={nft.userId}
            endAuctionTime={nft.endAuctionTime}
            status={nft.status}
            symbol={nft.symbol}
            bidOrders={nft.bidOrders}
            startingPrice={nft.startingPrice}
            chainId={nft.chainId}
            signedOrder={nft.signedOrder}
          />
        </Col>
      ))}
    </Row>
  );
}

export default NftList;
