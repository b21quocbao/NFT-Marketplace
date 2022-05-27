// our-domain.com/new-meetup
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";

import NewNftForm from "../../components/nfts/NewNftForm";
import StorageUtils from "../../utils/storage";
import { useWeb3React } from "@web3-react/core";
import { erc721ABI } from "../../contracts/abi/erc721ABI";
import { Contract } from "@ethersproject/contracts";
import {
  useEagerConnect,
  useInactiveListener,
} from "../../components/wallet/Hooks";
import { ensureIpfsUriPrefix, makeNFTMetadata, stripIpfsUriPrefix } from "../../helpers/contract";
import path from "path";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function NewMeetupPage() {
  const router = useRouter();
  const [user, setUser] = useState({} as any);
  const context = useWeb3React();
  const { library, active, connector } = context;

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

  async function addNftHandler(enteredNftData: any) {
    const signer = library.getSigner();
    const contract = new Contract(
      process.env.NEXT_PUBLIC_SMART_CONTRACT_ERC721 as string,
      erc721ABI,
      signer
    );

    // add the asset to IPFS
    const filePath = enteredNftData.image[0].originFileObj.name;
    const content = enteredNftData.image[0].originFileObj;
    const basename = path.basename(filePath);

    const ipfsPath = "/nft/" + basename;
    const { cid: assetCid } = await client.add({ path: ipfsPath, content });

    // make the NFT metadata JSON
    const assetURI = ensureIpfsUriPrefix(assetCid) + "/" + basename;
    const metadata = await makeNFTMetadata(assetURI, enteredNftData);

    // add the metadata to IPFS
    const { cid: metadataCid } = await client.add({
      path: "/nft/metadata.json",
      content: JSON.stringify(metadata),
    });
    const metadataURI = ensureIpfsUriPrefix(metadataCid) + "/metadata.json";
    const totalSupply = (await contract.totalSupply()).toNumber();
    
    contract.mint(user.address, 1, [metadataURI]);

    const response = await fetch("/api/new-nft", {
      method: "POST",
      body: JSON.stringify({
        imageUrl: `https://ipfs.io/ipfs/${stripIpfsUriPrefix(assetURI)}`,
        assetURI: assetURI,
        metadataURI: metadataURI,
        name: enteredNftData.name,
        description: enteredNftData.description,
        chain: enteredNftData.chain,
        status: "AVAILABLE",
        tokenId: Number(totalSupply) + 1,
        userId: user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return <>{active && <NewNftForm onAddNft={addNftHandler} />}</>;
}

export default NewMeetupPage;
