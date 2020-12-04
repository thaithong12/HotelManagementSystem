import userReducer from './userReducer'
import {combineReducers} from "redux";

import promotionReducer from './promotionReducer'
import roomReducer from "./roomReducer";
import serviceReducer from "./serviceReducer";
import convenienceReducer from "./convenienceReducer";
import roomCategoryReducer from "./roomCategoryReducer";
import userOrderReducer from "./userOrderReducer";
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomReducer,
  services: serviceReducer,
  conveniences: convenienceReducer,
  categories: roomCategoryReducer,
  promotions: promotionReducer,
  userOrders: userOrderReducer,
  orders: orderReducer,
})

export default rootReducer;
