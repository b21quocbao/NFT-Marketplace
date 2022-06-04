import {
  GET_MY_ACTIONS,
  GET_MY_ACTIONS_SUCCESS,
  GET_MY_ACTIONS_FAIL,
  CLEAR_ERROR
} from "./actionTypes";

const initialState = {
  actions: [],
  myActions: [],
  loading: false,
  error: {
    message: "",
  },
};

const ActionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_MY_ACTIONS:
      state = { ...state, loading: true };
      break;
    case GET_MY_ACTIONS_SUCCESS:
      state = { ...state, myActions: action.payload, loading: false };
      break;
    case GET_MY_ACTIONS_FAIL:
      state = {
        ...state,
        error: {
          message: "Get ACTIONs Failed",
        },
        loading: false,
      };
      break;
    case CLEAR_ERROR:
      state = { ...state, error: { message: '' }, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default ActionReducer;