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

const { toWei } = web3.utils;

function SaleNftPage(props: any) {
  const context = useWeb3React();
  const { library, active, connector } = context;

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

  async function saleNftHandler(enteredNftData: any) {
    const signer = library.getSigner();

    const makerAsset: any = {
      tokenAddress: process.env.NEXT_PUBLIC_SMART_CONTRACT_ERC721,
      tokenId: props.nft.tokenId,
      type: "ERC721",
    };

    const takerAsset: any = {
      tokenAddress: process.env.NEXT_PUBLIC_SMART_CONTRACT_ERC20,
      amount: toWei(enteredNftData.amount.toString()),
      type: "ERC20",
    };

    const makerAddress = props.user.address;

    const nftSwapSdk = new NftSwap(
      library,
      signer,
      process.env.NEXT_PUBLIC_CHAIN_ID
    );

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

    // Create the order (Remember, User A initiates the trade, so User A creates the order)
    const order = nftSwapSdk.buildOrder(makerAsset, takerAsset, makerAddress);

    const signedOrder = await nftSwapSdk.signOrder(order);

    const response = await fetch("/api/update-nft", {
      method: "PUT",
      body: JSON.stringify({
        id: props.nft.id,
        status: "LIST",
        signedOrder,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return <SaleNftForm onSaleNft={saleNftHandler} />;
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
