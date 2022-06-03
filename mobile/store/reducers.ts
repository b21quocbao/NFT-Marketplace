import { combineReducers } from "redux";

import AuthReducer from "./auth/reducer";
import NftReducer from "./nfts/reducer";
import ActionReducer from "./actions/reducer";
import CollectionReducer from "./collections/reducer";

const rootReducer = combineReducers({
  AuthReducer,
  NftReducer,
  ActionReducer,
  CollectionReducer,
});

export default rootReducer;