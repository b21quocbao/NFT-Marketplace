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

const { toWei, fromWei } = web3.utils;

function BidNftPage(props: any) {
  const context = useWeb3React();
  const router = useRouter();
  const { library, active, connector } = context;
  const [user, setUser] = useState({} as any);

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

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  async function bidNftHandler(enteredNftData: any) {
    const signer = library.getSigner();

    const takerAsset: any = {
      tokenAddress: process.env.NEXT_PUBLIC_SMART_CONTRACT_ERC721,
      tokenId: props.nft.tokenId,
      type: "ERC721",
    };

    const makerAsset: any = {
      tokenAddress: process.env.NEXT_PUBLIC_SMART_CONTRACT_ERC20,
      amount: toWei(enteredNftData.amount.toString()),
      type: "ERC20",
    };

    const nftSwapSdk = new NftSwap(
      library,
      signer,
      process.env.NEXT_PUBLIC_CHAIN_ID
    );
    console.log(makerAsset, user.address, "user.address");

    // Check if we need to approve the NFT for swapping
    const approvalStatusForUserB = await nftSwapSdk.loadApprovalStatus(
      makerAsset,
      user.address
    );
    console.log(approvalStatusForUserB, "approvalStatusForUserB");

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
          amount: toWei(marketplaceFee.toString()),
        },
        {
          recipient: props.user.address,
          amount: toWei(bidRoyaltyFee.toString()),
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

    router.push("/nfts");
  }

  return (
    <BidNftForm
      minPrice={fromWei(props.nft.startingPrice)}
      onBidNft={bidNftHandler}
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
