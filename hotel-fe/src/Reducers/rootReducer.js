import userReducer from './userReducer'
import {combineReducers} from "redux";
import promotionReducer from './promotionReducer'

export const rootReducer = combineReducers({
  userReducer, 
  promotions: promotionReducer
})
