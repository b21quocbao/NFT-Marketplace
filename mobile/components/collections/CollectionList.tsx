import { FlatList } from "react-native";
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
      data={props.collections}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default CollectionList;
