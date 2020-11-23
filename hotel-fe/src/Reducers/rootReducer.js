import userReducer from './userReducer'
import {combineReducers} from "redux";
import roomReducer from "./roomReducer";
import serviceReducer from "./serviceReducer";
import convenienceReducer from "./convenienceReducer";

const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomReducer,
  services: serviceReducer,
  conveniences: convenienceReducer
})

export default rootReducer;
