import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import AuctionNftForm from "../../components/nfts/AuctionNftForm";
import { CHAIN_DATA } from "../../constants/chain";
import { getChainConfig } from "../../helpers/ipfs";
import erc20ABI from "../../contracts/abi/erc20ABI.json";
import { getSymbol } from "../../store/nfts/helper/smartcontract/erc20";
import { auctionNft, clearErrors } from "../../store/nfts/actions";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function AuctionNft({ route }) {
  const { nft } = route.params;
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState(undefined as any);
  const { user } = useSelector((state: any) => state.AuthReducer);
  const { loading, error } = useSelector((state: any) => state.NftReducer);
  const navigation = useNavigation();

  useMemo(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(getChainConfig(connector.chainId))
    );

    setWeb3(web3);
  }, [connector.chainId]);
  const auctionNftHandler = async (enteredData) => {
    let {
      erc20TokenAddress,
      bidRoyaltyFee,
      startingPrice,
      expiry,
    } = enteredData;

    erc20TokenAddress = erc20TokenAddress.toLowerCase();
    let symbol = CHAIN_DATA[Number(connector.chainId)].symbol;

    if (erc20TokenAddress != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      const contract = new web3.eth.Contract(erc20ABI, erc20TokenAddress);
      symbol = await getSymbol(contract);
    }
    
    dispatch(
      auctionNft({
        nft,
        user,
        symbol,
        erc20TokenAddress,
        bidRoyaltyFee,
        startingPrice,
        expiry,
      })
    );

    navigation.navigate("My NFTs" as never);
  };

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && !error.message.length && (
        <AuctionNftForm onAuctionNft={auctionNftHandler} />
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

  return ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  button: {
    marginVertical: 15,
  },
  error: {
    color: "red",
    marginVertical: 15,
  },
});

export default AuctionNft;
