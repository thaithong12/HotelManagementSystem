import userReducer from './userReducer'
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  services: serviceReducer,
  conveniences: convenienceReducer
})

export default rootReducer;
