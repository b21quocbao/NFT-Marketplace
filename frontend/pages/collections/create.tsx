// our-domain.com/new-meetup
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";

import NewCollectionForm from "../../components/collections/NewCollectionForm";
import StorageUtils from "../../utils/storage";
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

    router.push("/collections");
  }

  return (
    <Fragment>
      <NewCollectionForm onAddCollection={addCollectionHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
