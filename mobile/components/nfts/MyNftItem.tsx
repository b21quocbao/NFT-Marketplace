import { useEffect, useState } from "react";
import web3 from "web3";
import { CHAIN_DATA } from "../../constants/chain";
import { Card } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import NFTItemField from "./NftItemField";
import NFTItemButton from "./NFTItemButton";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cancelNft } from "../../store/nfts/actions";

const { fromWei } = web3.utils;

function MyNftItem(props: any) {
  const dispatch = useDispatch();
  const { nft } = props;
  const { user } = useSelector((state: any) => state.AuthReducer);
  const [status, setStatus] = useState(nft.status);
  const [endAuctionTime, setEndAuctionTime] = useState(undefined as any);
  const navigation = useNavigation();

  useEffect(() => {
    let { status } = nft;

    setStatus(status);
    const checkStatus = () => {
      if (
        status === "AUCTION" &&
        new Date(nft.endAuctionTime).getTime() < Date.now()
      ) {
        setStatus("END AUCTION");
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, [nft.endAuctionTime, nft.status]);

  useEffect(() => {
    if (nft.endAuctionTime) {
      setEndAuctionTime(new Date(nft.endAuctionTime).getTime() - Date.now());

      const minusAuctionTime = () => {
        setEndAuctionTime((value: number) => value - 1000);
      };
      const interval = setInterval(minusAuctionTime, 1000);
      return () => clearInterval(interval);
    }
  }, [nft.endAuctionTime]);

  return (
    <>
      <Card>
        <Card.Image
          resizeMode="cover"
          style={{ width: 300, height: 300 }}
          source={{
            uri: nft.imageUrl,
          }}
        />
        <Card.Title>{nft.name}</Card.Title>
        <NFTItemField title="Chain" value={CHAIN_DATA[props.chainId]?.name} />
        <NFTItemField title="Status" value={status} />

        {status === "AVAILABLE" && (
          <View style={styles.container}>
            <View style={styles.button}>
              <NFTItemButton
                title="Sale"
                onPress={() => {
                  navigation.navigate("Sale NFT" as never, { nft } as never);
                }}
              />
            </View>
            <View style={styles.button}>
              <NFTItemButton
                title="Auction"
                onPress={() => {
                  navigation.navigate("Auction NFT" as never, { nft } as never);
                }}
              />
            </View>
          </View>
        )}
        {status === "LIST" && <NFTItemButton title="Cancel" onPress={() => {
          dispatch(cancelNft({ nft }))
        }}/>}
        {(status === "AUCTION" || status === "END AUCTION") && (
          <NFTItemButton
            title="View Offers"
            style={styles.singleButton}
            onPress={() => {
              navigation.navigate("NFT Offers" as never, { nft } as never);
            }}
          />
        )}
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  singleButton: {
    marginVertical: 15,
  },
});

export default MyNftItem;
