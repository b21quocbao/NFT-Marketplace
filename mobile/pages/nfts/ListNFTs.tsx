import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NftList from "../../components/nfts/NftList";
import { clearErrors, getNfts } from "../../store/nfts/actions";

const ListNfts = ({}) => {
  const dispatch = useDispatch();
  const {
    nfts,
    loading,
    error,
    auctionedNft,
    soldNft,
    confirmedNft,
    boughtNft,
    bidedNft,
    createdNFT,
  } = useSelector((state: any) => state.NftReducer);

  const onRefresh = useCallback(() => {
    dispatch(getNfts({}));
  }, []);

  useEffect(() => {
    if (!error.message.length) {
      dispatch(getNfts({}));
    }
  }, [
    error,
    auctionedNft,
    soldNft,
    confirmedNft,
    boughtNft,
    bidedNft,
    createdNFT,
  ]);

  return (
    <View style={[styles.container]}>
      {!error.message.length && (
        <NftList loading={loading} onRefresh={onRefresh} nfts={nfts} />
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

export default ListNfts;
