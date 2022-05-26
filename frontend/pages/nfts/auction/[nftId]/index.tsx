import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import AuctionNftForm from "../../../../components/nfts/AuctionNftForm";

function AuctionNftPage(props: any) {
  const router = useRouter();

  async function auctionNftHandler(enteredNftData: any) {
    const response = await fetch("/api/update-nft", {
      method: "PUT",
      body: JSON.stringify({
        id: props.nft.id,
        status: "AUCTION",
        startAuctionTime: new Date(Date.now()),
        endAuctionTime: new Date(Date.now() + enteredNftData.expiry * 1000),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/')
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
