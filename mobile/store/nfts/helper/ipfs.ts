import { call } from "redux-saga/effects";
import { ipfsAxiosInstance } from "../../../helpers/axios";
import {
  NEXT_PUBLIC_INFURA_PROJECT_ID,
  NEXT_PUBLIC_INFURA_PROJECT_SECRET,
} from "@env";
import { makeNFTMetadata } from "../../../helpers/ipfs";

export function* addImage(data: any) {
  const formData = new FormData();

  formData.append("file", {
    uri: data.uri,
    type: data.type,
    name: data.fileName,
  } as any);
  console.log(NEXT_PUBLIC_INFURA_PROJECT_ID, 'Line #17 ipfs.ts');
  console.log(NEXT_PUBLIC_INFURA_PROJECT_SECRET, 'Line #17 ipfs.ts');
  

  return yield call(() =>
    ipfsAxiosInstance.post("add?pin=true", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      auth: {
        username: NEXT_PUBLIC_INFURA_PROJECT_ID,
        password: NEXT_PUBLIC_INFURA_PROJECT_SECRET,
      },
    })
  );
}

export function* addString(data: string) {
  const formData = new FormData();

  formData.append("file", data);

  return yield call(() =>
    ipfsAxiosInstance.post("add?pin=true", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      auth: {
        username: NEXT_PUBLIC_INFURA_PROJECT_ID,
        password: NEXT_PUBLIC_INFURA_PROJECT_SECRET,
      },
    })
  );
}

export function* addNft(image: any, name: string, description: string) {
  const assetIpfsRes = yield call(addImage, image);
  const assetCid = assetIpfsRes.data.Hash;

  const metadata = makeNFTMetadata(`https://ipfs.infura.io/ipfs/${assetCid}`, { name, description });
  const metadataIpfsRes = yield call(addString, JSON.stringify(metadata));
  const metadataCid = metadataIpfsRes.data.Hash;

  return {
    assetUrl: `https://ipfs.infura.io/ipfs/${assetCid}`,
    metadataUrl: `https://ipfs.infura.io/ipfs/${metadataCid}`,
  }
}