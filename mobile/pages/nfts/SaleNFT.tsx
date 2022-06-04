import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import SaleNftForm from "../../components/nfts/SaleNftForm";
import { getChainConfig } from "../../helpers/ipfs";
import { saleNft } from "../../store/nfts/actions";
import erc721ABI from "../../contracts/abi/erc721ABI.json";
import erc20ABI from "../../contracts/abi/erc20ABI.json";
import { erc721ContractAddresses } from "../../contracts/erc721Contracts";
import {
  approveTokenOrNftByAsset,
  loadApprovalStatus,
} from "../../store/nfts/helper/smartcontract/erc721";
import {
  buildOrder,
  signOrder,
} from "../../store/nfts/helper/smartcontract/zeroEx";
import { NEXT_PUBLIC_ADMIN_WALLET, NEXT_PUBLIC_MARKETPLACE_FEE } from "@env";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { NATIVE_COINS } from "../../constants/chain";
import { NATIVE_TOKEN, TradeDirection } from "../../constants/zeroEx";
import { getSymbol } from "../../store/nfts/helper/smartcontract/erc20";

const { toWei } = Web3.utils;

function SaleNft({ route }) {
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState(undefined as any);
  const [contract, setContract] = useState(undefined as any);
  const [signer, setSigner] = useState(undefined as any);
  const { user } = useSelector((state: any) => state.AuthReducer);
  const { nft } = route.params;

  useMemo(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(getChainConfig(connector.chainId))
    );

    setWeb3(web3);
    setContract(
      new web3.eth.Contract(
        erc721ABI as any,
        erc721ContractAddresses[connector.chainId]
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
    };
    retreiveSigner();
  }, [connector.chainId]);

  const saleNftHandler = async (enteredNftData: any) => {
    const { amount, erc20TokenAddress } = enteredNftData;
    let { saleRoyaltyFee } = enteredNftData;
    const marketplaceFee = (Number(NEXT_PUBLIC_MARKETPLACE_FEE) * amount) / 100;
    const erc721TokenAddress =
      erc721ContractAddresses[Number(connector.chainId)];
    let symbol = NATIVE_COINS[Number(connector.chainId)];

    if (erc20TokenAddress != NATIVE_TOKEN) {
      const erc20Contract = new web3.eth.Contract(
        erc20ABI as any,
        erc20TokenAddress
      );
      symbol = await getSymbol(erc20Contract);
    }

    saleRoyaltyFee = (saleRoyaltyFee * amount) / 100;

    const makerAsset: any = {
      tokenAddress: erc721TokenAddress,
      tokenId: nft.tokenId,
      type: "ERC721",
    };

    const takerAsset: any = {
      tokenAddress: erc20TokenAddress,
      amount: toWei(amount.toFixed(10).toString()),
      type: "ERC20",
    };

    const { contractApproved } = await loadApprovalStatus(
      connector,
      contract,
      user,
      nft
    );

    if (!contractApproved) {
      await approveTokenOrNftByAsset(connector, contract, user);
    }

    const order = await buildOrder(makerAsset, takerAsset, {
      direction: TradeDirection.SellNFT,
      maker: user.address,
      fees: [
        {
          recipient: NEXT_PUBLIC_ADMIN_WALLET,
          amount: toWei(marketplaceFee.toFixed(10).toString()),
        },
        {
          recipient: user.address,
          amount: toWei(saleRoyaltyFee.toFixed(10).toString()),
        },
      ],
    });

    const signedOrder = await signOrder(connector, signer, order);

    dispatch(
      saleNft({
        nft,
        user,
        saleRoyaltyFee,
        signedOrder,
        symbol,
      })
    );
  };

  return <SaleNftForm onSaleNft={saleNftHandler}/>;
}

export default SaleNft;
