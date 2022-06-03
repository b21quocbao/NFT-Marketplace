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

const initialState = {
  nfts: [],
  myNfts: [],
  nft: null,
  collectionNfts: [],
  loading: false,
  error: {
    message: "",
  },
};

const NftReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_NFTS:
      state = { ...state, loading: true };
      break;
    case GET_NFTS_SUCCESS:
      state = { ...state, nfts: action.payload, loading: false };
      break;
    case GET_NFTS_FAIL:
      state = {
        ...state,
        error: {
          message: "Get NFTs Failed",
        },
        loading: false,
      };
      break;
    case GET_MY_NFTS:
      state = { ...state, loading: true };
      break;
    case GET_MY_NFTS_SUCCESS:
      state = { ...state, myNfts: action.payload, loading: false };
      break;
    case GET_MY_NFTS_FAIL:
      state = {
        ...state,
        error: {
          message: "Get NFTs Failed",
        },
        loading: false,
      };
      break;
    case GET_COLLECTION_NFTS:
      state = { ...state, loading: true };
      break;
    case GET_COLLECTION_NFTS_SUCCESS:
      state = { ...state, collectionNfts: action.payload, loading: false };
      break;
    case GET_COLLECTION_NFTS_FAIL:
      state = {
        ...state,
        error: {
          message: "Get NFTs Failed",
        },
        loading: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default NftReducer;
