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
  AUCTION_NFT,
  AUCTION_NFT_SUCCESS,
  AUCTION_NFT_FAIL,
  CLEAR_ERROR,
} from "./actionTypes";

const initialState = {
  nfts: [],
  myNfts: [],
  nft: null,
  createdNft: null,
  soldNft: null,
  boughtNft: null,
  bidedNft: null,
  confirmedNft: null,
  auctionedNft: null,
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
          message: "Get My NFTs Failed",
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
          message: "Get Collection NFTs Failed",
        },
        loading: false,
      };
      break;
    case CREATE_NFT:
      state = { ...state, loading: true };
      break;
    case CREATE_NFT_SUCCESS:
      state = { ...state, createdNft: action.payload, loading: false };
      break;
    case CREATE_NFT_FAIL:
      state = {
        ...state,
        error: {
          message: "Create NFTs Failed",
        },
        loading: false,
      };
      break;
    case CLEAR_CREATED_NFT:
      state = { ...state, createdNft: null, loading: false };
      break;
    case CLEAR_ERROR:
      state = { ...state, error: { message: "" }, loading: false };
      break;

    case SALE_NFT:
      state = { ...state, loading: true };
      break;
    case SALE_NFT_SUCCESS:
      state = { ...state, soldNft: action.payload, loading: false };
      break;
    case SALE_NFT_FAIL:
      state = {
        ...state,
        error: {
          message: "Create NFTs Failed",
        },
        loading: false,
      };
      break;

    case BUY_NFT:
      state = { ...state, loading: true };
      break;
    case BUY_NFT_SUCCESS:
      state = { ...state, boughtNft: action.payload, loading: false };
      break;
    case BUY_NFT_FAIL:
      state = {
        ...state,
        error: {
          message: "Create NFTs Failed",
        },
        loading: false,
      };
      break;

    case BID_NFT:
      state = { ...state, loading: true };
      break;
    case BID_NFT_SUCCESS:
      state = { ...state, bidedNft: action.payload, loading: false };
      break;
    case BID_NFT_FAIL:
      state = {
        ...state,
        error: {
          message: "Create NFTs Failed",
        },
        loading: false,
      };
      break;

    case CONFIRM_NFT:
      state = { ...state, loading: true };
      break;
    case CONFIRM_NFT_SUCCESS:
      state = { ...state, confirmedNft: action.payload, loading: false };
      break;
    case CONFIRM_NFT_FAIL:
      state = {
        ...state,
        error: {
          message: "Create NFTs Failed",
        },
        loading: false,
      };
      break;
      
    case AUCTION_NFT:
      state = { ...state, loading: true };
      break;
    case AUCTION_NFT_SUCCESS:
      state = { ...state, auctionedNft: action.payload, loading: false };
      break;
    case AUCTION_NFT_FAIL:
      state = {
        ...state,
        error: {
          message: "Create NFTs Failed",
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
