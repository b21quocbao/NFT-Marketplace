import { FlatList } from "react-native";
import OfferItem from "./OfferItem";

function OfferList(props: any) {
  const nft = JSON.parse(JSON.stringify(props.nft));
  
  if (!nft.bidOrders) {
    nft.bidOrders = [];
  }
  
  if (nft.bidOrders && nft.bidOrders.length) {
    nft.bidOrders[0].highestBidder = true;
  }

  for (let idx = 0; idx < nft.bidOrders.length; ++idx) {
    nft.bidOrders[idx].id = idx;
  }

  const renderItem = ({ item }) => (
    <OfferItem
      key={item.id}
      id={nft.id}
      chainId={nft.chainId}
      offer={item.signedOrder}
      endAuctionTime={nft.endAuctionTime}
      highestBid={item.highestBidder}
      userId={item.userId}
      makerUserId={nft.userId}
    />
  );

  return (
    <FlatList
      data={nft.bidOrders}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default OfferList;
