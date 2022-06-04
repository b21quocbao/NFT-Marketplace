import {
  CLEAR_ERROR,
  GET_NFTS,
  GET_NFTS_SUCCESS,
  GET_NFTS_FAIL,
  GET_MY_NFTS,
  GET_MY_NFTS_SUCCESS,
  GET_MY_NFTS_FAIL,
  GET_COLLECTION_NFTS,
  GET_COLLECTION_NFTS_SUCCESS,
  GET_COLLECTION_NFTS_FAIL,
  CREATE_NFT,
  CREATE_NFT_SUCCESS,
  CREATE_NFT_FAIL,
  CLEAR_CREATED_NFT,
  SALE_NFT,
  SALE_NFT_SUCCESS,
  SALE_NFT_FAIL,
  BUY_NFT,
  BUY_NFT_SUCCESS,
  BUY_NFT_FAIL,
  BID_NFT,
  BID_NFT_SUCCESS,
  BID_NFT_FAIL,
  CONFIRM_NFT,
  CONFIRM_NFT_SUCCESS,
  CONFIRM_NFT_FAIL,
} from "./actionTypes";

export const clearErrors = () => {
  return {
    type: CLEAR_ERROR,
  };
};

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

export const createNft = (data: any) => {
  return {
    type: CREATE_NFT,
    payload: data,
  };
};

export const createNftSuccess = (data: any) => {
  return {
    type: CREATE_NFT_SUCCESS,
    payload: data,
  };
};

export const createNftFail = (error: any) => {
  return {
    type: CREATE_NFT_FAIL,
    payload: error,
  };
};

export const saleNft = (data: any) => {
  return {
    type: SALE_NFT,
    payload: data,
  };
};

export const saleNftSuccess = (data: any) => {
  return {
    type: SALE_NFT_SUCCESS,
    payload: data,
  };
};

export const saleNftFail = (error: any) => {
  return {
    type: SALE_NFT_FAIL,
    payload: error,
  };
};

export const buyNft = (data: any) => {
  return {
    type: BUY_NFT,
    payload: data,
  };
};

export const buyNftSuccess = (data: any) => {
  return {
    type: BUY_NFT_SUCCESS,
    payload: data,
  };
};

export const buyNftFail = (error: any) => {
  return {
    type: BUY_NFT_FAIL,
    payload: error,
  };
};

export const bidNft = (data: any) => {
  return {
    type: BID_NFT,
    payload: data,
  };
};

export const bidNftSuccess = (data: any) => {
  return {
    type: BID_NFT_SUCCESS,
    payload: data,
  };
};

export const bidNftFail = (error: any) => {
  return {
    type: BID_NFT_FAIL,
    payload: error,
  };
};

export const confirmNft = (data: any) => {
  return {
    type: CONFIRM_NFT,
    payload: data,
  };
};

export const confirmNftSuccess = (data: any) => {
  return {
    type: CONFIRM_NFT_SUCCESS,
    payload: data,
  };
};

export const confirmNftFail = (error: any) => {
  return {
    type: CONFIRM_NFT_FAIL,
    payload: error,
  };
};

export const clearCreatedNft = () => {
  return {
    type: CLEAR_CREATED_NFT,
  };
};
