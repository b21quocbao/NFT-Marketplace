import { FlatList } from "react-native";
import NftItem from "./NftItem";

function NftList(props: any) {
  const renderItem = ({ item }) => (
    <NftItem
      key={item.id}
      id={item.id}
      imageUrl={item.imageUrl}
      name={item.name}
      address={item.address}
      userId={item.userId}
      endAuctionTime={item.endAuctionTime}
      status={item.status}
      symbol={item.symbol}
      bidOrders={item.bidOrders}
      startingPrice={item.startingPrice}
      chainId={item.chainId}
      signedOrder={item.signedOrder}
    />
  );

  return (
    <FlatList
      data={props.nfts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default NftList;
