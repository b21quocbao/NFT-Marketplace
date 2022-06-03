import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NftList from "../../components/nfts/NftList";
import { getCollectionNfts } from "../../store/nfts/actions";

const CollectionNfts = ({ route }) => {
  const dispatch = useDispatch();
  const { collectionNfts, loading, error } = useSelector(
    (state: any) => state.NftReducer
  );

  useEffect(() => {
    dispatch(getCollectionNfts({ collectionId: route.params.collectionId }));
  }, [dispatch]);

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && (
        <NftList nfts={collectionNfts} />
      )}
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

export default CollectionNfts;
