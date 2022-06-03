import {
  GET_COLLECTIONS,
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAIL,
  GET_MY_COLLECTIONS,
  GET_MY_COLLECTIONS_SUCCESS,
  GET_MY_COLLECTIONS_FAIL,
  ADD_COLLECTION,
  ADD_COLLECTION_SUCCESS,
  ADD_COLLECTION_FAIL,
  CLEAR_ADDED_COLLECTION,
  GET_SUPPORT_COLLECTIONS,
  GET_SUPPORT_COLLECTIONS_SUCCESS,
  GET_SUPPORT_COLLECTIONS_FAIL,
} from "./actionTypes";

export const getCollections = (data: any) => {
  return {
    type: GET_COLLECTIONS,
    payload: data,
  };
};

export const getCollectionsSuccess = (data: any) => {
  return {
    type: GET_COLLECTIONS_SUCCESS,
    payload: data,
  };
};

export const getCollectionsFail = (error: any) => {
  return {
    type: GET_COLLECTIONS_FAIL,
    payload: error,
  };
};

export const getMyCollections = (data: any) => {
  return {
    type: GET_MY_COLLECTIONS,
    payload: data,
  };
};

export const getMyCollectionsSuccess = (data: any) => {
  return {
    type: GET_MY_COLLECTIONS_SUCCESS,
    payload: data,
  };
};

export const getMyCollectionsFail = (error: any) => {
  return {
    type: GET_MY_COLLECTIONS_FAIL,
    payload: error,
  };
};

export const getSupportCollections = (data: any) => {
  return {
    type: GET_SUPPORT_COLLECTIONS,
    payload: data,
  };
};

export const getSupportCollectionsSuccess = (data: any) => {
  return {
    type: GET_SUPPORT_COLLECTIONS_SUCCESS,
    payload: data,
  };
};

export const getSupportCollectionsFail = (error: any) => {
  return {
    type: GET_SUPPORT_COLLECTIONS_FAIL,
    payload: error,
  };
};

export const addCollection = (data: any) => {
  return {
    type: ADD_COLLECTION,
    payload: data,
  };
};

export const addCollectionSuccess = (data: any) => {
  return {
    type: ADD_COLLECTION_SUCCESS,
    payload: data,
  };
};

export const addCollectionFail = (error: any) => {
  return {
    type: ADD_COLLECTION_FAIL,
    payload: error,
  };
};

export const clearAddedCollection = () => {
  return {
    type: CLEAR_ADDED_COLLECTION,
  };
};
