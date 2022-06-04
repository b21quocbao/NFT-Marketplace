import { takeLatest, put, call } from "redux-saga/effects";
import { GET_LOGIN_STORAGE, LOGIN, LOGOUT } from "./actionTypes";
import { loginSuccess, loginFail, login, logout } from "./actions";
import { axiosInstance } from "../../helpers/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function* saveLoginDataToStore(data: any) {
  const { user, accessToken, refreshToken } = data;

  yield AsyncStorage.multiSet([
    ["user", JSON.stringify(user)],
    ["accessToken", accessToken],
    ["refreshToken", refreshToken],
  ]);
}

function* removeLoginDataFromStore() {
  yield AsyncStorage.multiRemove(["user", "accessToken", "refreshToken"]);
}

function* getLoginStorage() {
  const response = yield AsyncStorage.multiGet([
    "user",
    "accessToken",
    "refreshToken",
  ]);

  if (response[0][1]) {
    yield put(
      loginSuccess({
        user: JSON.parse(response[0][1]),
        accessToken: response[1][1],
        refreshToken: response[2][1],
      })
    );
  } else {
    yield put(
      loginSuccess({
        user: null,
        accessToken: "",
        refreshToken: "",
      })
    );
  }
}

function* onLogin({ payload }: ReturnType<typeof login>) {
  try {
    const response = yield call(() => axiosInstance.post("login", payload));
    response.data.user.id = response.data.user._id;

    yield call(saveLoginDataToStore, response.data);
    yield put(loginSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(loginFail(error));
  }
}

function* onLogout() {
  yield call(removeLoginDataFromStore);
  yield logout();
}

function* AuthSaga() {
  yield takeLatest(LOGIN, onLogin);
  yield takeLatest(GET_LOGIN_STORAGE, getLoginStorage);
  yield takeLatest(LOGOUT, onLogout);
}

export default AuthSaga;
