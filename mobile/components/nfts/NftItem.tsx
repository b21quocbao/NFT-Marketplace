import { useEffect, useState } from "react";
import web3 from "web3";
import { CHAINS } from "../../constants/chain";
import { timeString } from "../../helpers/basic";
import { Card } from "@rneui/themed";
import { useSelector } from "react-redux";
import NFTItemField from "./NftItemField";
import NFTItemButton from "./NFTItemButton";
import { Image } from "react-native";

const { fromWei } = web3.utils;

function NftItem(props: any) {
  const { user } = useSelector((state: any) => state.AuthReducer);
  const [status, setStatus] = useState(props.status);
  const [endAuctionTime, setEndAuctionTime] = useState(undefined as any);

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
          style={{ padding: 0 }}
          source={{
            uri: props.imageUrl,
          }}
        />
        <Card.Title>{props.name}</Card.Title>
        <NFTItemField title="Chain" value={CHAINS[props.chainId]} />

        {status === "LIST" && (
          <>
            {props.signedOrder && (
              <NFTItemField
                title="Price"
                value={
                  fromWei(props.signedOrder.erc20TokenAmount) +
                  ` ${props.symbol}`
                }
              />
            )}
            {user && user.id !== props?.userId && <NFTItemButton title="Buy" />}
          </>
        )}
        {status === "AUCTION" && (
          <>
            {props.bidOrders && props.bidOrders.length && (
              <NFTItemField
                title="Highest Offer"
                value={
                  fromWei(props.bidOrders[0].signedOrder.erc20TokenAmount) +
                  ` ${props.symbol}`
                }
              />
            )}
            {!(props.bidOrders && props.bidOrders.length) && (
              <NFTItemField
                title="Starting Price"
                value={fromWei(props.startingPrice) + ` ${props.symbol}`}
              />
            )}
            <NFTItemField
              title="Expiry Time"
              value={timeString(endAuctionTime)}
            />
            {user && user.id !== props.userId && <NFTItemButton title="Bid" />}
            <NFTItemButton title="View Offers" />
          </>
        )}
      </Card>
    </>
  );
}

export default NftItem;
