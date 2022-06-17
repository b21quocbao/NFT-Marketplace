import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import AuctionNftForm from "../../../../components/nfts/AuctionNftForm";
import web3 from "web3";
import { useState, useEffect } from "react";
import erc20ABI from "../../../../contracts/abi/erc20ABI.json";
import StorageUtils from "../../../../utils/storage";
import { useEagerConnect, useInactiveListener } from "../../../../components/wallet/Hooks";
import { useWeb3React } from "@web3-react/core";
import { CHAIN_DATA } from "../../../../constants/chain";
import { Contract } from "@ethersproject/contracts";
import useConnectionInfo from "../../../../hooks/connectionInfo";

const { toWei } = web3.utils;

function AuctionNftPage(props: any) {
  const router = useRouter();
  const { user, library, chainId } = useConnectionInfo();
  const [loading, setLoading] = useState(false);

  async function auctionNftHandler(enteredNftData: any) {
    setLoading(true);
    const signer = library.getSigner();

    enteredNftData.erc20TokenAddress = enteredNftData.erc20TokenAddress.toLowerCase();
    let symbol = CHAIN_DATA[Number(chainId)].symbol;
  
    if (enteredNftData.erc20TokenAddress != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      const contract = new Contract(
        enteredNftData.erc20TokenAddress,
        erc20ABI,
        signer
      );
      symbol = await contract.symbol();
    }

    await fetch("/api/update-nft", {
      method: "PUT",
      body: JSON.stringify({
        id: props.nft.id,
        status: "AUCTION",
        symbol: symbol,
        erc20TokenAddress: enteredNftData.erc20TokenAddress,
        startingPrice: toWei(enteredNftData.startingPrice.toFixed(10).toString()),
        startAuctionTime: new Date(Date.now()),
        endAuctionTime: new Date(Date.now() + enteredNftData.expiry * 1000),
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
        name: "List for auction"
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push(`/nfts`)
  }

  return <AuctionNftForm chainId={props.nft.chainId} onAuctionNft={auctionNftHandler} loading={loading}  />;
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

export default AuctionNftPage;
