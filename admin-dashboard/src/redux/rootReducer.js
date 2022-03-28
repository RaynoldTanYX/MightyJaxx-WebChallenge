import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});

export default rootReducer;
