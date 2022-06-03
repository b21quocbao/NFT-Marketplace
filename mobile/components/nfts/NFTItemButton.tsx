import { Button } from "@rneui/base";
import { View, StyleSheet, Text } from "react-native";

export default function NFTItemButton(props: any) {
  return (
    <View style={props.style}>
      <Button
        title={props.title}
        onPress={props.onPress}
      />
    </View>
  );
}
