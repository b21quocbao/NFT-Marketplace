import { useEffect, useState } from "react";
import web3 from "web3";
import { CHAINS } from "../../constants/chain";
import { timeString } from "../../helpers/basic";
import { Card } from "@rneui/themed";
import { useSelector } from "react-redux";
import NFTItemField from "./NftItemField";
import NFTItemButton from "./NFTItemButton";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { fromWei } = web3.utils;

function MyNftItem(props: any) {
  const { user } = useSelector((state: any) => state.AuthReducer);
  const [status, setStatus] = useState(props.status);
  const [endAuctionTime, setEndAuctionTime] = useState(undefined as any);
  const navigation = useNavigation();

  useEffect(() => {
    let { status } = props;

    const checkStatus = () => {
      if (
        status === "AUCTION" &&
        new Date(props.endAuctionTime).getTime() < Date.now()
      ) {
        setStatus("END AUCTION");
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, [props]);

  useEffect(() => {
    if (props.endAuctionTime) {
      setEndAuctionTime(new Date(props.endAuctionTime).getTime() - Date.now());

      const minusAuctionTime = () => {
        setEndAuctionTime((value: number) => value - 1000);
      };
      const interval = setInterval(minusAuctionTime, 1000);
      return () => clearInterval(interval);
    }
  }, [props]);

  return (
    <>
      <Card>
        <Card.Image
          resizeMode="cover"
          style={{ width: 300, height: 300 }}
          source={{
            uri: props.imageUrl,
          }}
        />
        <Card.Title>{props.name}</Card.Title>
        <NFTItemField title="Chain" value={CHAINS[props.chainId]} />
        <NFTItemField title="Status" value={props.status} />

        {status === "AVAILABLE" && (
          <View style={styles.container}>
            <View style={styles.button}>
              <NFTItemButton
                title="Sale"
                onPress={() => {
                  navigation.navigate(
                    "Sale Nft" as never,
                    { nftId: props.id } as never
                  );
                }}
              />
            </View>
            <View style={styles.button}>
              <NFTItemButton
                title="Auction"
                onPress={() => {
                  navigation.navigate(
                    "Auction Nft" as never,
                    { nftId: props.id } as never
                  );
                }}
              />
            </View>
          </View>
        )}
        {status === "LIST" && <NFTItemButton title="Cancel" />}
        {status === "AUCTION" && (
          <NFTItemButton
            title="View Offers"
            style={styles.singleButton}
            onPress={() => {
              navigation.navigate(
                "NFT Offers" as never,
                { nftId: props.id } as never
              );
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
