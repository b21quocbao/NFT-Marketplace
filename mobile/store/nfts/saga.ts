import { takeLatest, put, call } from "redux-saga/effects";
import { GET_NFTS } from "./actionTypes";
import { getNftsSuccess, getNftsFail, getNfts } from "./actions";
import { axiosInstance } from "../../helpers/axios";

function* onGetNfts({ payload }: ReturnType<typeof getNfts>) {
  try {
    const response = yield call(() => axiosInstance.get("nfts", { params: payload }));

    yield put(getNftsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getNftsFail(error));
  }
}


function* NftSaga() {
  yield takeLatest(GET_NFTS, onGetNfts);
}

export default NftSaga;
