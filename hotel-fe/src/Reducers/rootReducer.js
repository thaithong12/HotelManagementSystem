import userReducer from './userReducer'
import {combineReducers} from "redux";
import roomReducer from "./roomReducer";

const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomReducer,
  services: serviceReducer,
  conveniences: convenienceReducer,
  categories: roomCategoryReducer
})

export default rootReducer;
