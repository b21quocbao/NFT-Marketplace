import { FlatList } from "react-native";
import MyNftItem from "./MyNftItem";

function MyNftList(props: any) {
  const renderItem = ({ item }) => <MyNftItem key={item.id} nft={item} />;

  return (
    <FlatList
      data={props.nfts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default MyNftList;
