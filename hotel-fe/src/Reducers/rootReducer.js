import userReducer from './userReducer'
import {combineReducers} from "redux";

import promotionReducer from './promotionReducer'
import roomReducer from "./roomReducer";
import serviceReducer from "./serviceReducer";
import convenienceReducer from "./convenienceReducer";
import roomCategoryReducer from "./roomCategoryReducer";
import userOrderReducer from "./userOrderReducer";
import currentCategoryReducer from './currentCategoryReducer'
const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomReducer,
  services: serviceReducer,
  conveniences: convenienceReducer,
  categories: roomCategoryReducer,
  promotions: promotionReducer,
  userOrders: userOrderReducer,
  currentCategoryReducer: currentCategoryReducer
})

export default rootReducer;
