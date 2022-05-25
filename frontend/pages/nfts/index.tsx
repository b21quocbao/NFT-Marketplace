import type { NextPage } from "next";
import { MongoClient } from "mongodb";
import NftList from "../../components/nfts/NftList";

const Nfts: NextPage = (props: any) => {
  return <NftList nfts={props.nfts} />;
};

export async function getServerSideProps() {
  // fetch data from an API
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db();

  const nftsNft = db.collection("nfts");

  const nfts = await nftsNft.find().toArray();

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

export default Nfts;
