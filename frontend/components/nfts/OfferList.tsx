import OfferItem from "./OfferItem";

function OfferList(props: any) {
  if (props.nft.bidOrders && props.nft.bidOrders.length) {
    props.nft.bidOrders[0].highestBidder = true;
  }
  return (
    <ul>
      {(props.nft.bidOrders || []).map((offer: any, index: number) => (
        <OfferItem
          key={index}
          offer={offer.signedOrder}
          endAuctionTime={props.nft.endAuctionTime}
          highestBid={offer.highestBidder}
          userId={offer.userId}
          makerUserId={props.nft.userId}
        />
      ))}
    </ul>
  );
}

export default OfferList;