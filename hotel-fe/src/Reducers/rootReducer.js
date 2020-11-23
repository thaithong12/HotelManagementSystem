import userReducer from './userReducer'
import {combineReducers} from "redux";
import roomReducer from "./roomReducer";
import serviceReducer from "./serviceReducer";
import convenienceReducer from "./convenienceReducer";
import roomCategoryReducer from "./roomCategoryReducer";

const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomReducer,
  services: serviceReducer,
  conveniences: convenienceReducer,
  categories: roomCategoryReducer
})

export default rootReducer;
