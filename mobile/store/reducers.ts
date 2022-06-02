import { combineReducers } from "redux";

import AuthReducer from "./auth/reducer";
import NftReducer from "./nfts/reducer";
import ActionReducer from "./actions/reducer";

const rootReducer = combineReducers({
  AuthReducer,
  NftReducer,
  ActionReducer
});

export default rootReducer;