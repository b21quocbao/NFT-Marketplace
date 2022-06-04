import { useEffect, useState } from "react";
import web3 from "web3";
import { CHAINS } from "../../constants/chain";
import { timeString } from "../../helpers/basic";
import { Card } from "@rneui/themed";
import { useSelector } from "react-redux";
import NFTItemField from "./NftItemField";
import NFTItemButton from "./NFTItemButton";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { fromWei } = web3.utils;

function NftItem(props: any) {
  const { nft } = props;
  const { user } = useSelector((state: any) => state.AuthReducer);
  const [status, setStatus] = useState(nft.status);
  const [endAuctionTime, setEndAuctionTime] = useState(undefined as any);
  const navigation = useNavigation();

  useEffect(() => {
    let { status } = nft;

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
          style={{ width: 300, height: 300 }}
          source={{
            uri: nft.imageUrl,
          }}
        />
        <Card.Title>{nft.name}</Card.Title>
        <NFTItemField title="Chain" value={CHAINS[nft.chainId]} />
        <NFTItemField title="Status" value={nft.status} />

        {status === "LIST" && (
          <>
            {nft.signedOrder && (
              <NFTItemField
                title="Price"
                value={
                  fromWei(nft.signedOrder.erc20TokenAmount) + ` ${nft.symbol}`
                }
              />
            )}
            {user && user.id !== nft?.userId && (
              <NFTItemButton style={styles.singleButton} onPress={props.onBuyNft} title="Buy" />
            )}
          </>
        )}
        {status === "AUCTION" && (
          <>
            {nft.bidOrders && nft.bidOrders.length && (
              <NFTItemField
                title="Highest Offer"
                value={
                  fromWei(nft.bidOrders[0].signedOrder.erc20TokenAmount) +
                  ` ${nft.symbol}`
                }
              />
            )}
            {!(nft.bidOrders && nft.bidOrders.length) && (
              <NFTItemField
                title="Starting Price"
                value={fromWei(nft.startingPrice) + ` ${nft.symbol}`}
              />
            )}
            <NFTItemField
              title="Expiry Time"
              value={timeString(endAuctionTime)}
            />
            {user && user.id !== nft.userId && (
              <NFTItemButton
                style={styles.singleButton}
                onPress={() => {
                  navigation.navigate("Bid NFT" as never, { nft } as never);
                }}
                title="Bid"
              />
            )}
            <NFTItemButton
              style={styles.singleButton}
              title="View Offers"
              onPress={() => {
                navigation.navigate("NFT Offers" as never, { nft } as never);
              }}
            />
          </>
        )}
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  singleButton: {
    marginTop: 15,
  },
});

export default NftItem;
