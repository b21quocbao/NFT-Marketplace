import { CHAIN_DATA } from "../../constants/chain";
import { Card } from "@rneui/themed";
import CollectionItemField from "./CollectionItemField";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

function CollectionItem(props: any) {
  const navigation = useNavigation();
  return (
    <>
      <Pressable onPress={() => {
        navigation.navigate('Collection NFTs' as never, { collectionId: props.id } as never)
      }}>
        <Card>
          <Card.Image
            style={{ width: 300, height: 300 }}
            source={{
              uri: props.imageUrl,
            }}
          />
          <Card.Title>{props.name}</Card.Title>
          <CollectionItemField title="Chain" value={CHAIN_DATA[props.chainId]?.name} />
        </Card>
      </Pressable>
    </>
  );
}

export default CollectionItem;
