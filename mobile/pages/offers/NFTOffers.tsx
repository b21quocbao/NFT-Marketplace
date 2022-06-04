import { StyleSheet, View } from "react-native";
import OfferList from "../../components/offers/OfferList";

const NFTOffers = ({ route }) => {
  const { nft } = route.params;

  return (
    <View style={[styles.container]}>
      <OfferList nft={nft} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  button: {
    marginVertical: 15,
  },
});

export default NFTOffers;
