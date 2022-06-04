import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../store/nfts/actions";
import HighestOfferItem from "./HighestOfferItem";
import OfferItem from "./OfferItem";

function OfferList(props: any) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.AuthReducer);
  const { loading, error } = useSelector((state: any) => state.NftReducer);
  const nft = JSON.parse(JSON.stringify(props.nft));

  if (!nft.bidOrders) {
    nft.bidOrders = [];
  }

  if (nft.bidOrders && nft.bidOrders.length) {
    nft.bidOrders[0].highestBid = true;
  }

  for (let idx = 0; idx < nft.bidOrders.length; ++idx) {
    nft.bidOrders[idx].id = idx;
  }

  const renderItem = ({ item }) => (
    <View>
      {item.highestBid &&
        user &&
        nft.userId == user.id &&
        new Date(nft.endAuctionTime).getTime() < Date.now() && (
          <HighestOfferItem key={item.id} offer={item} nft={nft} />
        )}
      {!item.highestBid && <OfferItem key={item.id} offer={item} nft={nft} />}
    </View>
  );

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && !error.message.length && (
        <FlatList
          data={nft.bidOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {!loading && error.message.length ? (
        <View style={[styles.error]}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  button: {
    marginVertical: 15,
  },
  error: {
    color: "red",
    marginVertical: 15,
  },
});

export default OfferList;
