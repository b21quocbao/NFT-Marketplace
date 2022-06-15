import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";

import NewNftForm from "../../../components/nfts/NewNftForm";
import StorageUtils from "../../../utils/storage";
import { useWeb3React } from "@web3-react/core";
import erc721ABI from "../../../contracts/abi/erc721ABI.json";
import { Contract } from "@ethersproject/contracts";
import {
  useEagerConnect,
  useInactiveListener,
} from "../../../components/wallet/Hooks";
import {
  ensureIpfsUriPrefix,
  makeNFTMetadata,
  stripIpfsUriPrefix,
} from "../../../helpers/contract";
import path from "path";
import { MongoClient } from "mongodb";
import web3 from "web3";
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
  const [user, setUser] = useState({} as any);
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState(props.collections);
  const context = useWeb3React();
  const { library, active, connector, chainId } = context;

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

  useEffect(() => {
    setUser(StorageUtils.getUser());
  }, []);

  useEffect(() => {
    setCollections(props.collections.filter((col: any) => col.chainId == chainId))
  }, [chainId, props.collections]);

  async function addNftHandler(enteredNftData: any) {
    setLoading(true);
    const cost = 0;
    const signer = library.getSigner();
    const numNft = enteredNftData.images.length;
    const assetCids = [] as any[];
    const contract = new Contract(
      CHAIN_DATA[Number(chainId)].erc721 as string,
      erc721ABI,
      signer
    );

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

    const ipfsAddMetadatas = await Promise.all(Array.from(Array(numNft).keys()).map(async(idx) => {
      const filePath = enteredNftData.images[idx].originFileObj.name;
      const basename = path.basename(filePath);
      const assetCid = assetCids[idx];
      const assetURI = ensureIpfsUriPrefix(assetCid) + "/" + basename;
      const metadata = await makeNFTMetadata(assetURI, enteredNftData);

      processedDatas.assetURI.push(assetURI);
      processedDatas.imageUrl.push(
        `https://ipfs.io/ipfs/${stripIpfsUriPrefix(assetURI)}`
      );

      // add the metadata to IPFS
      return {
        path: `/nft/metadata.json`,
        content: JSON.stringify(metadata),
      };
    }));

    // for await (const file of client.addAll(ipfsAddMetadatas)) {
    for (const ipfsAddMetadata of ipfsAddMetadatas) {
      const file = await client.add(ipfsAddMetadata);
      const metadataCid = file.cid;
      const metadataURI = ensureIpfsUriPrefix(metadataCid) + "/metadata.json";

      processedDatas.metadataURI.push(metadataURI);
    }

    const totalSupply = (await contract.totalSupply()).toNumber();

    await fetch("/api/new-nft", {
      method: "POST",
      body: JSON.stringify({
        imageUrls: processedDatas.imageUrl,
        assetURIs: processedDatas.assetURI,
        metadataURIs: processedDatas.metadataURI,
        assets: enteredNftData.assets,
        creator: user.address,
        collectionId: enteredNftData.collectionId,
        chainId: chainId?.toString(),
        status: "AVAILABLE",
        tokenId: Number(totalSupply) + 1,
        userId: user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await contract.mint(user.address, numNft, processedDatas.metadataURI, {
      value: toWei((cost * numNft).toString()),
    });

    setLoading(false);

    router.push(`/nfts/${user.id}`);
  }

  return (
    <>
      {active && (
        <NewNftForm onAddNft={addNftHandler} collections={collections} chainId={chainId} loading={loading} />
      )}
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  // fetch data from an API
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db();

  const collectionsCollection = db.collection("collections");

  const collections = await collectionsCollection.find({ userId: ctx.params.userId }).toArray();

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
