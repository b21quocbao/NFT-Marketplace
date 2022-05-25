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

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function NewMeetupPage() {
  const router = useRouter();
  const [user, setUser] = useState({} as any);
  const [contract, setContract] = useState(undefined as any);
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

    if (library) {
      const signer = library.getSigner();
      setContract(
        new Contract(
          process.env.NEXT_PUBLIC_SMART_CONTRACT_ERC721 as string,
          erc721ABI,
          signer
        )
      );
    }
  }, [library]);

  async function addNftHandler(enteredNftData: any) {
    console.log(active);

    const result = await client.add(enteredNftData.image[0].originFileObj);

    const tokenCount = await contract.tokenCount()
    contract.mint(`https://ipfs.infura.io/ipfs/${result.path}`);

    const response = await fetch("/api/new-nft", {
      method: "POST",
      body: JSON.stringify({
        imageUrl: `https://ipfs.infura.io/ipfs/${result.path}`,
        name: enteredNftData.name,
        description: enteredNftData.description,
        chain: enteredNftData.chain,
        status: "PENDING",
        tokenId: Number(tokenCount) + 1,
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
