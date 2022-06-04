import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { getChainConfig } from "../../helpers/ipfs";
import NftItem from "./NftItem";
import erc20ABI from "../../contracts/abi/erc20ABI.json";
import zeroExABI from "../../contracts/abi/zeroExABI.json";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { buyNft } from "../../store/nfts/actions";
import {
  approveTokenOrNftByAsset,
  loadApprovalStatus,
} from "../../store/nfts/helper/smartcontract/erc20";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { fillSignedOrder } from "../../store/nfts/helper/smartcontract/zeroEx";
import { zeroContractAddresses } from "../../contracts/zeroExContracts";

function NftList(props: any) {
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState(undefined as any);
  const [signer, setSigner] = useState(undefined as any);
  const [etherProvider, setEtherProvider] = useState(undefined as any);
  const { user } = useSelector((state: any) => state.AuthReducer);

  useMemo(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(getChainConfig(connector.chainId))
    );

    setWeb3(web3);

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

  const renderItem = ({ item: nft }) => {
    const buyNftHandler = async () => {
      const { signedOrder } = nft;
      const erc20Contract = new web3.eth.Contract(
        erc20ABI as any,
        signedOrder.erc20Token
      );
      const zeroExContract = new web3.eth.Contract(
        zeroExABI as any,
        zeroContractAddresses[connector.chainId]
      );

      const takerAsset: any = {
        tokenAddress: signedOrder.erc20Token,
        amount: signedOrder.erc20TokenAmount,
        type: "ERC20",
      };

      const { contractApproved } = await loadApprovalStatus(
        connector,
        erc20Contract,
        user,
        takerAsset
      );
      if (!contractApproved) {
        await approveTokenOrNftByAsset(connector, erc20Contract, user);
      }

      const fillTx = await fillSignedOrder(
        connector,
        zeroExContract,
        user,
        signedOrder
      );

      dispatch(
        buyNft({
          etherProvider,
          nft,
          user,
          fillTx,
        })
      );
    };
    return <NftItem key={nft.id} nft={nft} onBuyNft={buyNftHandler} />;
  };

  return (
    <FlatList
      data={props.nfts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default NftList;
