import { useMemo, useState } from "react";
import BidNftForm from "../../components/nfts/BidNftForm";
import Web3 from "web3";
import { getChainConfig } from "../../helpers/ipfs";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch, useSelector } from "react-redux";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { bidNft, clearErrors } from "../../store/nfts/actions";
import { erc721ContractAddresses } from "../../contracts/erc721Contracts";
import {
  approveTokenOrNftByAsset,
  loadApprovalStatus,
} from "../../store/nfts/helper/smartcontract/erc20";
import erc20ABI from "../../contracts/abi/erc20ABI.json";
import { NEXT_PUBLIC_ADMIN_WALLET, NEXT_PUBLIC_MARKETPLACE_FEE } from "@env";
import {
  buildOrder,
  signOrder,
} from "../../store/nfts/helper/smartcontract/zeroEx";
import { TradeDirection } from "../../constants/zeroEx";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const { fromWei, toWei } = Web3.utils;

function BidNft({ route }) {
  const nft = route.params.nft;
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState(undefined as any);
  const [signer, setSigner] = useState(undefined as any);
  const [contract, setContract] = useState(undefined as any);
  const [etherProvider, setEtherProvider] = useState(undefined as any);
  const { user } = useSelector((state: any) => state.AuthReducer);
  const { loading, error } = useSelector((state: any) => state.NftReducer);
  const navigation = useNavigation();

  useMemo(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(getChainConfig(connector.chainId))
    );

    setWeb3(web3);
    setContract(new web3.eth.Contract(erc20ABI as any, nft.erc20TokenAddress));

    const retreiveSigner = async () => {
      const provider = new WalletConnectProvider({
        rpc: {
          [connector.chainId]: getChainConfig(connector.chainId),
        },
        chainId: connector.chainId,
        connector: connector,
        qrcode: false,
      });
      await provider.enable();
      const ethers_provider = new ethers.providers.Web3Provider(provider);
      const signer = ethers_provider.getSigner();
      setSigner(signer);
      setEtherProvider(ethers_provider);
    };
    retreiveSigner();
  }, [connector.chainId]);

  const bidNftHandler = async (enteredData: any) => {
    const { amount } = enteredData;
    let { bidRoyaltyFee, bidOrders } = nft;
    const marketplaceFee = (Number(NEXT_PUBLIC_MARKETPLACE_FEE) * amount) / 100;
    const takerAsset: any = {
      tokenAddress: erc721ContractAddresses[connector.chainId],
      tokenId: nft.tokenId,
      type: "ERC721",
    };

    bidRoyaltyFee = (bidRoyaltyFee * amount) / 100;

    const makerAsset: any = {
      tokenAddress: nft.erc20TokenAddress,
      amount: toWei(amount.toFixed(10).toString()),
      type: "ERC20",
    };

    const { contractApproved } = await loadApprovalStatus(
      connector,
      contract,
      user,
      makerAsset
    );

    if (!contractApproved) {
      await approveTokenOrNftByAsset(connector, contract, user);
    }

    // Create the order (Remember, User A initiates the trade, so User A creates the order)
    const order = await buildOrder(takerAsset, makerAsset, {
      direction: TradeDirection.BuyNFT,
      maker: user.address,
      fees: [
        {
          recipient: NEXT_PUBLIC_ADMIN_WALLET,
          amount: toWei(marketplaceFee.toFixed(10).toString()),
        },
        {
          recipient: nft.creator,
          amount: toWei(bidRoyaltyFee.toFixed(10).toString()),
        },
      ],
    });

    const signedOrder = await signOrder(connector, signer, order);

    if (!bidOrders) bidOrders = [];
    bidOrders.push({ signedOrder, userId: user.id });
    bidOrders.sort((a: any, b: any) => {
      return (
        Number(fromWei(b.signedOrder.erc20TokenAmount)) -
        Number(fromWei(a.signedOrder.erc20TokenAmount))
      );
    });

    dispatch(
      bidNft({
        nft,
        bidOrders,
        user,
      })
    );

    navigation.navigate("All NFTs" as never);
  };

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && !error.message.length && (
        <BidNftForm
          minPrice={fromWei(nft.startingPrice)}
          onBidNft={bidNftHandler}
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
  },
  button: {
    marginVertical: 15,
  },
  error: {
    color: "red",
    marginVertical: 15,
  },
});

export default BidNft;
