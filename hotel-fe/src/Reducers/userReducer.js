import {LOGIN_ACCOUNT, LOGOUT_ACCOUNT} from "../Constans/userConstants";

const initialState = {
  userCurrent: {},
  notLoaded:true
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_ACCOUNT:
      return state;
    case LOGIN_ACCOUNT: {
      let  newState = {...state, userCurrent: action.user, notLoaded: false}
      return newState;
    }
    default: return state;
  }
}
