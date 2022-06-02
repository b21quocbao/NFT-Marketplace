import { takeLatest, put, call } from "redux-saga/effects";
import { GET_MY_ACTIONS } from "./actionTypes";
import { getMyActionsSuccess, getMyActionsFail, getMyActions } from "./actions";
import { axiosInstance } from "../../helpers/axios";

function* onGetMyActions({ payload }: ReturnType<typeof getMyActions>) {
  try {
    const response = yield call(() =>
      axiosInstance.get("actions", { params: payload })
    );

    yield put(getMyActionsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getMyActionsFail(error));
  }
}

function* ActionSaga() {
  yield takeLatest(GET_MY_ACTIONS, onGetMyActions);
}

export default ActionSaga;
