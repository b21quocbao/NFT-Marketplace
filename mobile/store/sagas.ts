import { all, fork } from "redux-saga/effects";

import AuthSaga from "./auth/saga";
import NftSaga from "./nfts/saga";
import ActionSaga from "./actions/saga";

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(NftSaga), fork(ActionSaga)]);
}