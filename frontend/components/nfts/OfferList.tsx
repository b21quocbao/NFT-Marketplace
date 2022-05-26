import OfferItem from "./OfferItem";

function OfferList(props: any) {
  return (
    <ul>
      {(props.bidOrders || []).map((offer: any, index: number) => (
        <OfferItem
          key={index}
          offer={offer.signedOrder}
          userId={offer.userId}
        />
      ))}
    </ul>
  );
}

export default OfferList;