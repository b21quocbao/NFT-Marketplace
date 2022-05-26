// our-domain.com/new-meetup
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";

import NewCollectionForm from "../../components/collections/NewCollectionForm";
import StorageUtils from "../../utils/storage";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function NewMeetupPage() {
  const router = useRouter();
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    setUser(StorageUtils.getUser());
  }, []);

  async function addCollectionHandler(enteredCollectionData: any) {
    const result = await client.add(
      enteredCollectionData.image[0].originFileObj,

    );

    const response = await fetch("/api/new-collection", {
      method: "POST",
      body: JSON.stringify({
        imageUrl: `https://ipfs.infura.io/ipfs/${result.path}`,
        name: enteredCollectionData.name,
        description: enteredCollectionData.description,
        chain: enteredCollectionData.chain,
        userId: user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <NewCollectionForm onAddCollection={addCollectionHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
