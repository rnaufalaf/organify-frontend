import { combineReducers } from "redux";
import searchFilterReducer from "./searchFIlterReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  searchFilter: searchFilterReducer,
  orders: orderReducer,
});
