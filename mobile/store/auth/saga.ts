import { takeLatest, put, call } from "redux-saga/effects";

import { LOGIN } from "./actionTypes";

import { loginSuccess, loginFail, login } from "./actions";

function* onLogin({ payload }: ReturnType<typeof login>) {
  try {
    const response = yield call(() => fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }));
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFail(error.response));
  }
}

function* AuthSaga() {
  yield takeLatest(login, onLogin);
}

export default AuthSaga;
