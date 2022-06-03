import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_NFTS,
  GET_MY_NFTS,
  GET_COLLECTION_NFTS,
  CREATE_NFT,
} from "./actionTypes";
import {
  getNftsSuccess,
  getNftsFail,
  getNfts,
  getMyNftsSuccess,
  getMyNftsFail,
  getCollectionNftsSuccess,
  getCollectionNftsFail,
  getCollectionNfts,
  createNft,
  createNftSuccess,
  createNftFail,
} from "./actions";
import { axiosInstance } from "../../helpers/axios";
import { addNft } from "./helper/ipfs";
import { getTotalSupply } from "./helper/smartcontract";

function* onGetNfts() {
  try {
    const response = yield call(() => axiosInstance.get("nfts", {}));

    yield put(getNftsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getNftsFail(error));
  }
}

function* onGetMyNfts({ payload }: ReturnType<typeof getNfts>) {
  try {
    const response = yield call(() =>
      axiosInstance.get("nfts", { params: payload })
    );

    yield put(getMyNftsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getMyNftsFail(error));
  }
}

function* onGetCollectionNfts({
  payload,
}: ReturnType<typeof getCollectionNfts>) {
  try {
    const response = yield call(() =>
      axiosInstance.get("nfts", { params: payload })
    );

    yield put(getCollectionNftsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getCollectionNftsFail(error));
  }
}

function* onCreateNft({ payload }: ReturnType<typeof createNft>) {
  try {
    const { assetUrl, metadataUrl } = yield call(() =>
      addNft(payload.image.value, payload.name.value, payload.description.value)
    );
    const totalSupply = yield call(() => getTotalSupply(payload.contract));

    const response = yield call(() =>
      axiosInstance.post("new-nft", {
        imageUrls: [assetUrl],
        assetURIs: [assetUrl],
        metadataURIs: [metadataUrl],
        assets: [
          { name: payload.name.value, description: payload.description.value },
        ],
        collectionId: payload.collectionId.value,
        chainId: payload.chainId,
        status: "AVAILABLE",
        tokenId: totalSupply,
        userId: payload.userId,
      })
    );

    yield put(createNftSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(createNftFail(error));
  }
}

function* NftSaga() {
  yield takeLatest(GET_NFTS, onGetNfts);
  yield takeLatest(GET_MY_NFTS, onGetMyNfts);
  yield takeLatest(GET_COLLECTION_NFTS, onGetCollectionNfts);
  yield takeLatest(CREATE_NFT, onCreateNft);
}

export default NftSaga;
