import { RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import MyActionItem from "./MyActionItem";

function MyActionList(props: any) {
  const renderItem = ({ item }) => (
    <MyActionItem key={item.id} id={item.id} name={item.name} nft={item.nft} />
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={props.loading}
          onRefresh={props.onRefresh}
        />
      }
      data={props.actions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default MyActionList;
