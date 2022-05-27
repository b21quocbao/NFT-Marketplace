import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import AuctionNftForm from "../../../../components/nfts/AuctionNftForm";
import web3 from "web3";
import { useEffect, useState } from "react";
import StorageUtils from "../../../../utils/storage";

const { toWei } = web3.utils;

function AuctionNftPage(props: any) {
  const router = useRouter();
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    setUser(StorageUtils.getUser());
  }, []);

  async function auctionNftHandler(enteredNftData: any) {
    await fetch("/api/update-nft", {
      method: "PUT",
      body: JSON.stringify({
        id: props.nft.id,
        status: "AUCTION",
        bidRoyaltyFee: enteredNftData.bidRoyaltyFee,
        startingPrice: toWei(enteredNftData.startingPrice.toString()),
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
        nftId: props.id,
        name: "List for auction"
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push('/nfts')
  }

  return <AuctionNftForm onAuctionNft={auctionNftHandler} />;
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
