import { combineReducers } from "redux";

import AuthReducer from "./auth/reducer";
import NftReducer from "./nfts/reducer";

const rootReducer = combineReducers({
  AuthReducer,
  NftReducer
});

export default rootReducer;