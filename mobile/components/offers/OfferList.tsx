import { FlatList } from "react-native";
import OfferItem from "./OfferItem";

function OfferList(props: any) {
  if (!props.nft.bidOrders) {
    props.nft.bidOrders = [];
  }
  
  if (props.nft.bidOrders && props.nft.bidOrders.length) {
    props.nft.bidOrders[0].highestBidder = true;
  }

  for (let idx = 0; idx < props.nft.bidOrders.length; ++idx) {
    props.nft.bidOrders[idx].id = idx;
  }

  const renderItem = ({ item }) => (
    <OfferItem
      key={item.id}
      id={props.nft.id}
      chainId={props.nft.chainId}
      offer={item.signedOrder}
      endAuctionTime={props.nft.endAuctionTime}
      highestBid={item.highestBidder}
      userId={item.userId}
      makerUserId={props.nft.userId}
    />
  );

  return (
    <FlatList
      data={props.nft.bidOrders}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default OfferList;
