import OfferItem from "./OfferItem";

function OfferList(props: any) {
  return (
    <ul>
      {(props.nft.bidOrders || []).map((offer: any, index: number) => (
        <OfferItem
          key={index}
          offer={offer.signedOrder}
          userId={offer.userId}
          makerUserId={props.nft.userId}
        />
      ))}
    </ul>
  );
}

export default OfferList;