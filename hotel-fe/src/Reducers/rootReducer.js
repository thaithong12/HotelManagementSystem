import userReducer from './userReducer'
import {combineReducers} from "redux";
import roomReducer from "./roomReducer";

const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomReducer
})

export default rootReducer;
