import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_LOGIN_STORAGE,
  LOGOUT,
} from "./actionTypes";

export const getLoginStorage = () => {
  return {
    type: GET_LOGIN_STORAGE,
  };
};

export const login = (authRequest: any) => {
  return {
    type: LOGIN,
    payload: authRequest,
  };
};

export const loginSuccess = (authResponse: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: authResponse,
  };
};

export const loginFail = (error: any) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};