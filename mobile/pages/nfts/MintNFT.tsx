import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NewNftForm from "../../components/nfts/NewNftForm";
import { getCollections } from "../../store/collections/actions";

function MintNFT({ route }) {
  const { collections, loading, error } = useSelector(
    (state: any) => state.CollectionReducer
  );
  const { user } = useSelector(
    (state: any) => state.AuthReducer
  );
  const dispatch = useDispatch();

  const chainId = 80001;
  const addNftHandler = async () => {};

  useEffect(() => {
    dispatch(getCollections({ chainId, userId: user.id }));
  }, [dispatch]);

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && (
        <NewNftForm
          onAddNft={addNftHandler}
          collections={collections}
          chainId={chainId}
        />
      )}
      {!loading && error.message.length ? (
        <View style={[styles.button]}>
          <Text>Error message: {error.message}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  button: {
    marginVertical: 15,
  },
});

export default MintNFT;
