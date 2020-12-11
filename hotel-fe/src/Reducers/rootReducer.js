import userReducer from './userReducer'
import {combineReducers} from "redux";

import promotionReducer from './promotionReducer'
import roomReducer from "./roomReducer";
import serviceReducer from "./serviceReducer";
import convenienceReducer from "./convenienceReducer";
import roomCategoryReducer from "./roomCategoryReducer";
import userOrderReducer from "./userOrderReducer";
import bookingAdminReducer from "./bookingAdminReducer";
import currentCategoryReducer from './currentCategoryReducer'
import reviewReducer from "./reviewReducer";

const rootReducer = combineReducers({
  user: userReducer,
  rooms: roomReducer,
  services: serviceReducer,
  conveniences: convenienceReducer,
  categories: roomCategoryReducer,
  promotions: promotionReducer,
  currentCategoryReducer: currentCategoryReducer,
  bookings: bookingAdminReducer,
  userOrders: userOrderReducer,
  reviews: reviewReducer
})

export default rootReducer;
