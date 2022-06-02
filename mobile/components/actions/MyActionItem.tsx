import { Card } from "@rneui/base";
import { Text } from "react-native";

function MyActionItem(props: any) {
  return (
    <Card>
      <Card.Image
        style={{ width: 300, height: 300 }}
        source={{
          uri: props.nft.imageUrl,
        }}
      />
      <Card.Title>{props.name}</Card.Title>
      <Text>{`${props.nft.name} - ${props.nft.id}`}</Text>
    </Card>
  );
}

export default MyActionItem;
