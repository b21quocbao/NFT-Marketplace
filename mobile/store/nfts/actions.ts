import {
  GET_NFTS,
  GET_NFTS_SUCCESS,
  GET_NFTS_FAIL,
} from "./actionTypes";

export const getNfts = (data: any) => {
  return {
    type: GET_NFTS,
    payload: data,
  };
};

export const getNftsSuccess = (data: any) => {
  return {
    type: GET_NFTS_SUCCESS,
    payload: data,
  };
};

export const getNftsFail = (error: any) => {
  return {
    type: GET_NFTS_FAIL,
    payload: error,
  };
};
