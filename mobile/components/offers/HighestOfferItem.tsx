import { Button } from "@rneui/base";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { getChainConfig } from "../../helpers/ipfs";
import {
  approveTokenOrNftByAsset,
  loadApprovalStatus,
} from "../../store/nfts/helper/smartcontract/erc721";
import erc721ABI from "../../contracts/abi/erc721ABI.json";
import zeroExABI from "../../contracts/abi/zeroExABI.json";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { fillSignedOrder } from "../../store/nfts/helper/smartcontract/zeroEx";
import { zeroContractAddresses } from "../../contracts/zeroExContracts";
import { confirmNft } from "../../store/nfts/actions";
import { Text, View } from "react-native";
import ItemField from "./ItemField";
import { useNavigation } from "@react-navigation/native";
import { CHAIN_DATA } from "../../constants/chain";

const { fromWei } = Web3.utils;

function HighestOfferItem(props: any) {
  const { nft, offer } = props;
  const { signedOrder, userId, highestBid } = offer;
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState(undefined as any);
  const [signer, setSigner] = useState(undefined as any);
  const [contract, setContract] = useState(undefined as any);
  const [zeroExContract, setZeroExContract] = useState(undefined as any);
  const [etherProvider, setEtherProvider] = useState(undefined as any);
  const { user } = useSelector((state: any) => state.AuthReducer);
  const navigation = useNavigation();

  useMemo(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(getChainConfig(connector.chainId))
    );

    setWeb3(web3);
    setContract(
      new web3.eth.Contract(
        erc721ABI as any,
        CHAIN_DATA[connector.chainId].erc721
      )
    );
    setZeroExContract(
      new web3.eth.Contract(
        zeroExABI as any,
        zeroContractAddresses[connector.chainId]
      )
    );

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

  const confirmNftHandler = async (enteredNftData: any) => {
    // Check if we need to approve the NFT for swapping
    const { contractApproved } = await loadApprovalStatus(
      connector,
      contract,
      user,
      nft
    );

    if (!contractApproved) {
      await approveTokenOrNftByAsset(connector, contract, user);
    }

    const fillTx = await fillSignedOrder(
      connector,
      zeroExContract,
      user,
      signedOrder
    );
    navigation.navigate("My NFTs" as never);

    dispatch(
      confirmNft({
        etherProvider,
        nft,
        user,
        fillTx,
        userId,
      })
    );
  };

  return (
    <View>
      <ItemField title="Bidder" value={signedOrder.maker} />
      <ItemField title="Amount" value={fromWei(signedOrder.erc20TokenAmount)} />
      <Button title="Confirm this offer" onPress={confirmNftHandler} />
    </View>
  );
}

export default HighestOfferItem;
