import { View, StyleSheet, Text } from "react-native";

export default function ItemField(props: any) {
  return (
    <Text style={styles.title}>
      {props.title}:
      <Text style={styles.value}> {props.value}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  value: {
    color: "red",
  },
});