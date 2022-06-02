import {
  GET_MY_ACTIONS,
  GET_MY_ACTIONS_SUCCESS,
  GET_MY_ACTIONS_FAIL,
} from "./actionTypes";

export const getMyActions = (data: any) => {
  return {
    type: GET_MY_ACTIONS,
    payload: data,
  };
};

export const getMyActionsSuccess = (data: any) => {
  return {
    type: GET_MY_ACTIONS_SUCCESS,
    payload: data,
  };
};

export const getMyActionsFail = (error: any) => {
  return {
    type: GET_MY_ACTIONS_FAIL,
    payload: error,
  };
};
