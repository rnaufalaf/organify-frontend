import { combineReducers } from "redux";
import searchFilterReducer from "./searchFIlterReducer";
import orderReducer from "./orderReducer";
import imagePickerReducer from "./imagePickerReducer";

export default combineReducers({
  searchFilter: searchFilterReducer,
  orders: orderReducer,
  imagePicker: imagePickerReducer,
});
