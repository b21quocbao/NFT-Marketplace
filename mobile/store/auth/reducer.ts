import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./actionTypes";

const initialState = {
  user: [],
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: {
    message: "",
  },
};

const PostReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      state = { ...state, loading: true };
      break;
    case LOGIN_SUCCESS:
      state = { ...state, ...action.payload, loading: false };
      break;
    case LOGIN_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
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

export default PostReducer;