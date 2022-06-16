import { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyNftList from "../../components/nfts/MyNftList";
import { clearErrors, getMyNfts } from "../../store/nfts/actions";

const MyNfts = () => {
  const dispatch = useDispatch();
  const {
    myNfts,
    loading,
    error,
    auctionedNft,
    soldNft,
    confirmedNft,
    boughtNft,
    bidedNft,
    createdNFT,
    canceledNft,
  } = useSelector((state: any) => state.NftReducer);
  const { user } = useSelector((state: any) => state.AuthReducer);

  const onRefresh = useCallback(() => {
    dispatch(getMyNfts({ userId: user.id }));
  }, []);

  useEffect(() => {
    if (!error.message.length) {
      dispatch(getMyNfts({ userId: user.id }));
    }
  }, [
    user.id,
    error,
    auctionedNft,
    soldNft,
    confirmedNft,
    boughtNft,
    bidedNft,
    createdNFT,
    canceledNft,
  ]);

  return (
    <View style={[styles.container]}>
      {!error.message.length && (
        <MyNftList loading={loading} onRefresh={onRefresh} nfts={myNfts} />
      )}
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

export default MyNfts;
