import type { NextApiRequest } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db();

  const nftsCollection = db.collection("nfts");

  const nfts = await nftsCollection
    .find(req.query.userId ? { userId: req.query.userId } : {})
    .toArray();
  

  res.status(200).json(
    nfts.map((nft) => ({
      ...nft,
      id: nft._id.toString(),
      _id: null,
    }))
  );
}
