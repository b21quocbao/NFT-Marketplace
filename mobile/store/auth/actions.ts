import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./actionTypes";

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