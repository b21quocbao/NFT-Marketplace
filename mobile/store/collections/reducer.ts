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

const initialState = {
  collections: [],
  myCollections: [],
  supportCollections: [],
  addedCollection: null,
  loading: false,
  error: {
    message: "",
  },
};

const CollectionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_COLLECTIONS:
      state = { ...state, loading: true };
      break;
    case GET_COLLECTIONS_SUCCESS:
      state = { ...state, collections: action.payload, loading: false };
      break;
    case GET_COLLECTIONS_FAIL:
      state = {
        ...state,
        error: {
          message: "Get Collection Failed",
        },
        loading: false,
      };
      break;
    case GET_MY_COLLECTIONS:
      state = { ...state, loading: true };
      break;
    case GET_MY_COLLECTIONS_SUCCESS:
      state = { ...state, myCollections: action.payload, loading: false };
      break;
    case GET_MY_COLLECTIONS_FAIL:
      state = {
        ...state,
        error: {
          message: "Get My Collection Failed",
        },
        loading: false,
      };
      break;
    case GET_SUPPORT_COLLECTIONS:
      state = { ...state, loading: true };
      break;
    case GET_SUPPORT_COLLECTIONS_SUCCESS:
      state = { ...state, supportCollections: action.payload, loading: false };
      break;
    case GET_SUPPORT_COLLECTIONS_FAIL:
      state = {
        ...state,
        error: {
          message: "Get Support Collection Failed",
        },
        loading: false,
      };
      break;
    case ADD_COLLECTION:
      state = { ...state, loading: true };
      break;
    case ADD_COLLECTION_SUCCESS:
      state = {
        ...state,
        addedCollection: action.payload,
        loading: false,
      };
      break;
    case ADD_COLLECTION_FAIL:
      state = {
        ...state,
        error: {
          message: "Add Collection Failed",
        },
        loading: false,
      };
      break;
    case CLEAR_ADDED_COLLECTION:
      state = {
        ...state,
        addedCollection: null,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default CollectionReducer;
