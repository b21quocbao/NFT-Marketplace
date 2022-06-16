import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";
import NewNftForm from "../../../components/nfts/NewNftForm";
import erc721ABI from "../../../contracts/abi/erc721ABI.json";
import { Contract } from "@ethersproject/contracts";
import {
  ensureIpfsUriPrefix,
  makeNFTMetadata,
  stripIpfsUriPrefix,
} from "../../../helpers/contract";
import path from "path";
import { MongoClient } from "mongodb";
import web3 from "web3";
import useConnectionInfo from "../../../hooks/connectionInfo";
import { actions } from "@metaplex/js";
import { CHAIN_DATA } from "../../../constants/chain";

const { toWei } = web3.utils;

const auth =
  "Basic " +
  Buffer.from(
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID +
      ":" +
      process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET
  ).toString("base64");

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});

function NewNftPage(props: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState(props.collections);
  const { user, library, chainId, connection, wallet } = useConnectionInfo();

  useEffect(() => {
    setCollections(
      props.collections.filter((col: any) => col.chainId == chainId)
    );
  }, [chainId, props.collections]);

  async function addNftHandler(enteredNftData: any) {
    // setLoading(true);
    const cost = 0;
    const numNft = enteredNftData.images.length;
    const assetCids = [] as any[];

    const ipfsAddAssets = enteredNftData.images.map((image: any) => {
      const filePath = image.originFileObj.name;
      const content = image.originFileObj;
      const basename = path.basename(filePath);
      const ipfsPath = "/nft/" + basename;

      return {
        path: ipfsPath,
        content: content,
      };
    });

    // for await (const file of client.addAll(ipfsAddAssets)) {
    for (const ipfsAddAsset of ipfsAddAssets) {
      const file = await client.add(ipfsAddAsset);

      assetCids.push(file.cid);
    }

    const processedDatas = {
      metadataURI: [] as string[],
      assetURI: [] as string[],
      imageUrl: [] as string[],
    };

    const ipfsAddMetadatas = await Promise.all(
      Array.from(Array(numNft).keys()).map(async (idx) => {
        const filePath = enteredNftData.images[idx].originFileObj.name;
        const basename = path.basename(filePath);
        const assetCid = assetCids[idx];
        const assetURI = ensureIpfsUriPrefix(assetCid) + "/" + basename;
        console.log(enteredNftData.assets[idx], "xocviu");
        
        const metadata = await makeNFTMetadata(assetURI, user.address, enteredNftData.assets[idx]);
        console.log(metadata, 'metadata');
        

        processedDatas.assetURI.push(assetURI);
        processedDatas.imageUrl.push(
          `https://ipfs.infura.io/ipfs/${stripIpfsUriPrefix(assetURI)}`
        );

        // add the metadata to IPFS
        return {
          path: `/nft/metadata.json`,
          content: JSON.stringify(metadata),
        };
      })
    );

    let tokenId = undefined as any;
    const metadatas = [];

    // for await (const file of client.addAll(ipfsAddMetadatas)) {
    for (const ipfsAddMetadata of ipfsAddMetadatas) {
      const file = await client.add(ipfsAddMetadata);
      const metadataCid = file.cid;
      const metadataURI = ensureIpfsUriPrefix(metadataCid) + "/metadata.json";

      processedDatas.metadataURI.push(metadataURI);
    }

    if (!user.solana) {
      const signer = library.getSigner();
      const contract = new Contract(
        CHAIN_DATA[Number(chainId)].erc721 as string,
        erc721ABI,
        signer
      );

      const totalSupply = (await contract.totalSupply()).toNumber();

      await contract.mint(user.address, numNft, processedDatas.metadataURI, {
        value: toWei((cost * numNft).toString()),
      });

      tokenId = Number(totalSupply) + 1;
    } else if (connection && wallet) {
      const mintNFTResponse = await actions.mintNFT({
        connection,
        wallet: wallet as any,
        uri: `https://ipfs.infura.io/ipfs/${stripIpfsUriPrefix(processedDatas.metadataURI[0])}`,
        maxSupply: 0,
      });
      metadatas.push(mintNFTResponse);
      tokenId = mintNFTResponse.mint;
    }

    await fetch("/api/new-nft", {
      method: "POST",
      body: JSON.stringify({
        imageUrls: processedDatas.imageUrl,
        assetURIs: processedDatas.assetURI,
        metadataURIs: processedDatas.metadataURI,
        assets: enteredNftData.assets,
        creator: user.address,
        collectionId: enteredNftData.collectionId,
        metadatas: metadatas,
        chainId: chainId?.toString(),
        status: "AVAILABLE",
        tokenId: tokenId,
        userId: user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    router.push(`/nfts/${user.id}`);
  }

  return (
    <NewNftForm
      onAddNft={addNftHandler}
      collections={collections}
      chainId={chainId}
      loading={loading}
    />
  );
}

export async function getServerSideProps(ctx: any) {
  // fetch data from an API
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db();

  const collectionsCollection = db.collection("collections");

  const collections = await collectionsCollection
    .find({ userId: ctx.params.userId })
    .toArray();

  client.close();

  return {
    props: {
      collections: collections.map((collection: any) => ({
        ...collection,
        id: collection._id.toString(),
        _id: null,
      })),
    },
  };
}

export default NewNftPage;
