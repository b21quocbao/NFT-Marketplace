import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyNftList from "../../components/nfts/MyNftList";
import { getMyNfts } from "../../store/nfts/actions";

const MyNfts = ({ route }) => {
  const dispatch = useDispatch();
  const { myNfts, loading, error } = useSelector(
    (state: any) => state.NftReducer
  );

  useEffect(() => {
    dispatch(getMyNfts({ userId: route.params.userId }));
  }, [dispatch]);

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && (
        <MyNftList nfts={myNfts} />
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

export default MyNfts;
