import { FlatList, RefreshControl } from "react-native";
import CollectionItem from "./CollectionItem";

function CollectionList(props: any) {
  const renderItem = ({ item }) => (
    <CollectionItem
      key={item.id}
      id={item.id}
      imageUrl={item.imageUrl}
      description={item.description}
      name={item.name}
      chainId={item.chainId}
    />
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={props.loading}
          onRefresh={props.onRefresh}
        />
      }
      data={props.collections}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default CollectionList;
