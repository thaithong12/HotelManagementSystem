import {LOGIN_ACCOUNT, LOGOUT_ACCOUNT} from "../Constans/userConstants";


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {isAdmin:false , loggedIn: false, user } : {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_ACCOUNT:
      return {};
    case LOGIN_ACCOUNT: {
      let  newState = {...state, user: action.user, loggedIn: true}
      if (action.user.authorization.includes("ROLE_USER"))
        newState.isAdmin = true;
      console.log(newState);
      return newState;
    }
    default: return state;
  }
}
