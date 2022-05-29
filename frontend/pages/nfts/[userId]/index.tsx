import { MongoClient } from "mongodb";
import { NextPage } from "next";
import MyNftList from "../../../components/nfts/MyNftList";

const MyNfts: NextPage = (props: any) => {
  return <MyNftList nfts={props.nfts} />;
};

export async function getServerSideProps(ctx: any) {
  // fetch data from an API
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db();

  const nftsCollection = db.collection("nfts");

  const nfts = await nftsCollection.find({ userId: ctx.params.userId }).toArray();

  client.close();

  return {
    props: {
      nfts: nfts.map((nft) => ({
        ...nft,
        id: nft._id.toString(),
        _id: null,
      })),
    },
  };
}

export default MyNfts;
