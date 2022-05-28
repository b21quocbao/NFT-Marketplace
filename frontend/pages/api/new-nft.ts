import { MongoClient } from "mongodb";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db();

    const nftsCollection = db.collection("nfts");

    for (let idx = 0; idx < data.assets.length; ++idx) {
      const imageUrl = data.imageUrls[idx];
      const assetURI = data.assetURIs[idx];
      const metadataURI = data.metadataURIs[idx];
      const { name, description } = data.assets[idx];
      const collectionId = data.collectionId;
      const chainId = data.chainId;
      const status = data.status;
      const tokenId = data.tokenId + idx;
      const userId = data.userId;

      await nftsCollection.insertOne({
        imageUrl,
        assetURI,
        metadataURI,
        collectionId,
        chainId,
        status,
        tokenId,
        userId,
        name,
        description
      })
    }

    client.close();

    res.status(201).json({ message: "Collection inserted!" });
  }
}

export default handler;
