import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NftList from "../../components/nfts/NftList";
import { getNfts } from "../../store/nfts/actions";

const ListNfts = ({ route }) => {
  const dispatch = useDispatch();
  const { nfts, loading, error } = useSelector(
    (state: any) => state.NftReducer
  );

  useEffect(() => {
    dispatch(getNfts({ userId: route?.params?.userId }));
  }, [dispatch]);

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && (
        <NftList nfts={nfts} />
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

export default ListNfts;
