import userReducer from './userReducer'
import {combineReducers} from "redux";
import roomCategoryReducer from './roomCategoryReducer';
const rootReducer = combineReducers({
  user: userReducer,
  categories: roomCategoryReducer
})

export default rootReducer;
