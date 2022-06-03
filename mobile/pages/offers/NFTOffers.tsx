import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import OfferList from "../../components/offers/OfferList";

const NFTOffers = ({ route }) => {
  const { nfts, loading, error } = useSelector(
    (state: any) => state.NftReducer
  );
  const nft = nfts.filter((nft: any) => nft.id == route.params.nftId)[0];

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && <OfferList nft={nft} />}
      {!loading && error.message.length ? (
        <View style={[styles.button]}>
          <Text>Error message: {error.message}</Text>
        </View>
      ) : null}
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
