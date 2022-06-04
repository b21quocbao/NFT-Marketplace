import { View } from "react-native";
import Web3 from "web3";
import ItemField from "./ItemField";

const { fromWei } = Web3.utils;

function OfferItem(props: any) {
  const { nft, offer } = props;
  const { signedOrder, userId, highestBid } = offer;

  return (
    <View>
      <ItemField title="Bidder" value={signedOrder.maker} />
      <ItemField title="Amount" value={fromWei(signedOrder.erc20TokenAmount)} />
    </View>
  );
}

export default OfferItem;
