import { MongoClient, ObjectId } from "mongodb";
import BidNftForm from "../../../../components/nfts/BidNftForm";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  useEagerConnect,
  useInactiveListener,
} from "../../../../components/wallet/Hooks";
import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
import StorageUtils from "../../../../utils/storage";
import web3 from "web3";
import { useRouter } from "next/router";
import { Contract } from "@ethersproject/contracts";
import { erc20ABI } from "../../../../contracts/abi/erc20ABI";
import { NATIVE_COINS } from "../../../../constants/chain";
import { erc721ContractAddresses } from "../../../../contracts/erc721Contracts";
import { zeroContractAddresses } from "../../../../contracts/zeroExContracts";

const { toWei, fromWei } = web3.utils;

function BidNftPage(props: any) {
  const context = useWeb3React();
  const router = useRouter();
  const { library, active, connector, chainId } = context;
  const [user, setUser] = useState({} as any);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(StorageUtils.getUser());
  }, []);

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    console.log("running");
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useEffect(() => {
    const { ethereum } = window;
    const changeChain = async() => {
      if (props.nft.chainId != chainId) {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${Number(props.nft.chainId).toString(16)}` }], // chainId must be in hexadecimal numbers
          });
        } catch (e: any) {
          if (e.code === 4902) {
            window.alert(`Please add chain with id ${props.nft.chainId} to your wallet then try again`);
          }
        }
      }
    }

    changeChain();
  }, [chainId, props.nft.chainId]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  async function bidNftHandler(enteredNftData: any) {
    setLoading(true);
    const signer = library.getSigner();

    const takerAsset: any = {
      tokenAddress: erc721ContractAddresses[Number(chainId)],
      tokenId: props.nft.tokenId,
      type: "ERC721",
    };

    const makerAsset: any = {
      tokenAddress: props.nft.erc20TokenAddress,
      amount: toWei(enteredNftData.amount.toFixed(10).toString()),
      type: "ERC20",
    };

    const nftSwapSdk = new NftSwap(
      library,
      signer,
      chainId,
      {
        zeroExExchangeProxyContractAddress: zeroContractAddresses[
          Number(chainId)
        ]
          ? zeroContractAddresses[Number(chainId)]
          : undefined,
      }
    );

    // Check if we need to approve the NFT for swapping
    const approvalStatusForUserB = await nftSwapSdk.loadApprovalStatus(
      makerAsset,
      user.address
    );

    // If we do need to approve NFT for swapping, let's do that now
    if (!approvalStatusForUserB.contractApproved) {
      const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
        makerAsset,
        user.address
      );
      const approvalTxReceipt = await approvalTx.wait();
      console.log(
        `Approved ${makerAsset.tokenAddress} contract to swap with 0x. TxHash: ${approvalTxReceipt.transactionHash})`
      );
    }

    const marketplaceFee =
      (Number(process.env.NEXT_PUBLIC_MARKETPLACE_FEE) *
        enteredNftData.amount) /
      100;
    const bidRoyaltyFee =
      (props.nft.bidRoyaltyFee * enteredNftData.amount) / 100;

    // Create the order (Remember, User A initiates the trade, so User A creates the order)
    const order = nftSwapSdk.buildOrder(makerAsset, takerAsset, user.address, {
      taker: props.user.address,
      fees: [
        {
          recipient: process.env.NEXT_PUBLIC_ADMIN_WALLET as string,
          amount: toWei(marketplaceFee.toFixed(10).toString()),
        },
        {
          recipient: props.user.address,
          amount: toWei(bidRoyaltyFee.toFixed(10).toString()),
        },
      ],
    });

    const signedOrder = await nftSwapSdk.signOrder(order);
    let { bidOrders } = props.nft;
    console.log(bidOrders, "bidOrdersoxcivuxoicvu");

    if (!bidOrders) bidOrders = [];
    bidOrders.push({ signedOrder, userId: user.id });
    bidOrders.sort((a: any, b: any) => {
      return (
        Number(fromWei(b.signedOrder.erc20TokenAmount)) -
        Number(fromWei(a.signedOrder.erc20TokenAmount))
      );
    });

    await fetch("/api/update-nft", {
      method: "PUT",
      body: JSON.stringify({
        id: props.nft.id,
        bidOrders: bidOrders,
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
        name: "Bid",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push(`/nfts`);
  }

  return (
    <BidNftForm
      minPrice={fromWei(props.nft.startingPrice)}
      onBidNft={bidNftHandler}
      loading={loading}
    />
  );
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

export default BidNftPage;
