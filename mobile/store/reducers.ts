import { combineReducers } from "redux";

import AuthReducer from "./auth/reducer";

const rootReducer = combineReducers({
  AuthReducer,
});

export default rootReducer;