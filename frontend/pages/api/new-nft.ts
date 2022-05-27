import { MongoClient } from "mongodb";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db();

    const nftsCollection = db.collection("nfts");

    const result = await nftsCollection.insertOne(data);

    client.close();

    res.status(201).json({ id: result.insertedId.toString() });
  }
}

export default handler;
