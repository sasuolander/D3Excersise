import { combineReducers } from "redux";
import { XScale, YScale } from "./d3State";
import data from "./dataReducer";
import searchBar from "./searchBarReducer";

export default combineReducers({
  data,
  searchBar,
  XScale,
  YScale
});
