import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OfferList from "../../components/offers/OfferList";
import { clearErrors } from "../../store/nfts/actions";

const NFTOffers = ({ route }) => {
  const { nfts, loading, error } = useSelector(
    (state: any) => state.NftReducer
  );
  const dispatch = useDispatch();

  const nft = nfts.filter((nft: any) => nft.id == route.params.nftId)[0];

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && !error.message.length && <OfferList nft={nft} />}
      {!loading && error.message.length ? (
        <View style={[styles.button]}>
          <Text>Error message: {error.message}</Text>
          <Button
            title="Retry"
            onPress={() => {
              dispatch(clearErrors());
            }}
          />
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
