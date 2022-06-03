import {
  GET_NFTS,
  GET_NFTS_SUCCESS,
  GET_NFTS_FAIL,
  GET_MY_NFTS,
  GET_MY_NFTS_SUCCESS,
  GET_MY_NFTS_FAIL,
  GET_COLLECTION_NFTS,
  GET_COLLECTION_NFTS_SUCCESS,
  GET_COLLECTION_NFTS_FAIL,
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

export const getMyNfts = (data: any) => {
  return {
    type: GET_MY_NFTS,
    payload: data,
  };
};

export const getMyNftsSuccess = (data: any) => {
  return {
    type: GET_MY_NFTS_SUCCESS,
    payload: data,
  };
};

export const getMyNftsFail = (error: any) => {
  return {
    type: GET_MY_NFTS_FAIL,
    payload: error,
  };
};

export const getCollectionNfts = (data: any) => {
  return {
    type: GET_COLLECTION_NFTS,
    payload: data,
  };
};

export const getCollectionNftsSuccess = (data: any) => {
  return {
    type: GET_COLLECTION_NFTS_SUCCESS,
    payload: data,
  };
};

export const getCollectionNftsFail = (error: any) => {
  return {
    type: GET_COLLECTION_NFTS_FAIL,
    payload: error,
  };
};
