import { takeLatest, put, call } from "redux-saga/effects";
import { GET_NFTS, GET_MY_NFTS, GET_COLLECTION_NFTS } from "./actionTypes";
import {
  getNftsSuccess,
  getNftsFail,
  getNfts,
  getMyNftsSuccess,
  getMyNftsFail,
  getCollectionNftsSuccess,
  getCollectionNftsFail,
  getCollectionNfts,
} from "./actions";
import { axiosInstance } from "../../helpers/axios";

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

function* NftSaga() {
  yield takeLatest(GET_NFTS, onGetNfts);
  yield takeLatest(GET_MY_NFTS, onGetMyNfts);
  yield takeLatest(GET_COLLECTION_NFTS, onGetCollectionNfts);
}

export default NftSaga;
