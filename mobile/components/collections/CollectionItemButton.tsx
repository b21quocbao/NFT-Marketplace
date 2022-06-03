import { Button } from "@rneui/base";
import { View, StyleSheet, Text } from "react-native";

export default function CollectionItemButton(props: any) {
  return (
    <View>
      <Button title={props.title} />
    </View>
  );
}
