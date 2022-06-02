import { Button } from "@rneui/base";
import { View, StyleSheet, Text } from "react-native";

export default function NFTItemButton(props: any) {
  return (
    <View>
      <Button title={props.title} />
    </View>
  );
}
