import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_LOGIN_STORAGE,
} from "./actionTypes";

const initialState = {
  user: null,
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: {
    message: "",
  },
};

const AuthReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      state = { ...state, loading: true };
      break;
    case GET_LOGIN_STORAGE:
      state = { ...state, loading: true };
      break;
    case LOGIN_SUCCESS:
      state = { ...state, ...action.payload, loading: false };
      break;
    case LOGIN_FAIL:
      state = {
        ...state,
        error: {
          message: "Login Failed",
        },
        loading: false,
      };
      break;
    case LOGOUT:
      state = initialState;
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default AuthReducer;