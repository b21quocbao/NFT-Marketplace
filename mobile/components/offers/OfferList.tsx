import { FlatList, View } from "react-native";
import HighestOfferItem from "./HighestOfferItem";
import OfferItem from "./OfferItem";

function OfferList(props: any) {
  const nft = JSON.parse(JSON.stringify(props.nft));

  if (!nft.bidOrders) {
    nft.bidOrders = [];
  }

  if (nft.bidOrders && nft.bidOrders.length) {
    nft.bidOrders[0].highestBid = true;
  }

  for (let idx = 0; idx < nft.bidOrders.length; ++idx) {
    nft.bidOrders[idx].id = idx;
  }

  const renderItem = ({ item }) => (
    <View>
      {item.highestBid && (
        <HighestOfferItem key={item.id} offer={item} nft={nft} />
      )}
      {!item.highestBid && <OfferItem key={item.id} offer={item} nft={nft} />}
    </View>
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
