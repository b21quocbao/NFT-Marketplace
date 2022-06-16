import { MongoClient, ObjectId } from "mongodb";
import SaleNftForm from "../../../../components/nfts/SaleNftForm";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  useEagerConnect,
  useInactiveListener,
} from "../../../../components/wallet/Hooks";
import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
import web3 from "web3";
import { useRouter } from "next/router";
import StorageUtils from "../../../../utils/storage";
import { Contract } from "@ethersproject/contracts";
import erc20ABI from "../../../../contracts/abi/erc20ABI.json";
import { CHAIN_DATA } from "../../../../constants/chain";
import { zeroContractAddresses } from "../../../../contracts/zeroExContracts";

const { toWei } = web3.utils;

function SaleNftPage(props: any) {
  const context = useWeb3React();
  const router = useRouter();
  const { library, active, connector, chainId } = context;
  const [user, setUser] = useState({} as any);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(StorageUtils.getUser());
  }, [library]);

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    console.log("running");
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useEffect(() => {
    const { ethereum } = window;
    const changeChain = async () => {
      if (props.nft.chainId != chainId) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              { chainId: `0x${Number(props.nft.chainId).toString(16)}` },
            ], // chainId must be in hexadecimal numbers
          });
        } catch (e: any) {
          if (e.code === 4902) {
            window.alert(
              `Please add chain with id ${props.nft.chainId} to your wallet then try again`
            );
          }
        }
      }
    };

    changeChain();
  }, [chainId, props.nft.chainId]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  async function saleNftHandler(enteredNftData: any) {
    setLoading(true);
    const signer = library.getSigner();
    enteredNftData.erc20TokenAddress =
      enteredNftData.erc20TokenAddress.toLowerCase();
    let symbol = CHAIN_DATA[Number(chainId)].symbol;

    if (
      enteredNftData.erc20TokenAddress !=
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    ) {
      const contract = new Contract(
        enteredNftData.erc20TokenAddress,
        erc20ABI,
        signer
      );
      symbol = await contract.symbol();
    }

    const makerAsset: any = {
      tokenAddress: CHAIN_DATA[Number(chainId)].erc721,
      tokenId: props.nft.tokenId,
      type: "ERC721",
    };

    const takerAsset: any = {
      tokenAddress: enteredNftData.erc20TokenAddress,
      amount: toWei(enteredNftData.amount.toFixed(10).toString()),
      type: "ERC20",
    };

    const makerAddress = props.user.address;

    const nftSwapSdk = new NftSwap(library, signer, chainId, {
      zeroExExchangeProxyContractAddress: zeroContractAddresses[Number(chainId)]
        ? zeroContractAddresses[Number(chainId)]
        : undefined,
    });

    // Check if we need to approve the NFT for swapping
    const approvalStatusForUserA = await nftSwapSdk.loadApprovalStatus(
      makerAsset,
      makerAddress
    );

    // If we do need to approve User A's CryptoPunk for swapping, let's do that now
    if (!approvalStatusForUserA.contractApproved) {
      const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
        makerAsset,
        makerAddress
      );
      const approvalTxReceipt = await approvalTx.wait();
      console.log(
        `Approved ${makerAsset.tokenAddress} contract to swap with 0x v4 (txHash: ${approvalTxReceipt.transactionHash})`
      );
    }

    const marketplaceFee =
      (Number(process.env.NEXT_PUBLIC_MARKETPLACE_FEE) *
        enteredNftData.amount) /
      100;
    const royaltyFee =
      (props.nft.royaltyFee * enteredNftData.amount) / 100;

    // Create the order (Remember, User A initiates the trade, so User A creates the order)
    const order = nftSwapSdk.buildOrder(makerAsset, takerAsset, makerAddress, {
      fees: [
        {
          recipient: process.env.NEXT_PUBLIC_ADMIN_WALLET as string,
          amount: toWei(marketplaceFee.toFixed(10).toString()),
        },
        {
          recipient: props.nft.creator,
          amount: toWei(royaltyFee.toFixed(10).toString()),
        },
      ],
    });

    const signedOrder = await nftSwapSdk.signOrder(order);

    await fetch("/api/update-nft", {
      method: "PUT",
      body: JSON.stringify({
        id: props.nft.id,
        status: "LIST",
        symbol: symbol,
        signedOrder,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetch("/api/new-action", {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        nftId: props.nft.id,
        name: "List for sale",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push(`/nfts`);
  }

  return <SaleNftForm onSaleNft={saleNftHandler} loading={loading} />;
}

export async function getServerSideProps(ctx: any) {
  // fetch data from an API
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db();

  const nftsCollection = db.collection("nfts");
  const usersCollection = db.collection("users");

  const nft: any = await nftsCollection.findOne({
    _id: new ObjectId(ctx.params.nftId),
  });
  const user: any = await usersCollection.findOne({
    _id: new ObjectId(nft.userId),
  });

  client.close();

  return {
    props: {
      nft: {
        ...nft,
        id: nft._id.toString(),
        _id: null,
      },
      user: {
        ...user,
        id: user._id.toString(),
        _id: null,
      },
    },
  };
}

export default SaleNftPage;
