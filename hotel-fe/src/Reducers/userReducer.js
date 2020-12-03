import {LOGIN_ACCOUNT, LOGOUT_ACCOUNT} from "../Constans/userConstants";


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {isAdmin:user.isAdmin , loggedIn: user.loggedIn, user } : {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_ACCOUNT:
      return {};
    case LOGIN_ACCOUNT: {
      let  newState = {...state, user: action.user, loggedIn: true}
      if (action.user.authorization.includes("ROLE_ADMIN")){
        newState.isAdmin = true;
      } else newState.isAdmin = false;
      return newState;
    }
    default: return state;
  }
}
