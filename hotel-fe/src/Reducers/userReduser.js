import {LOGIN_ACCOUNT, LOGOUT_ACCOUNT} from "../Constans/userConstants";
import {LoginAccount} from "../Services/userServices";

const initialState = {
  userCurrent: {
    email : '',
    password: ''
  }
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_ACCOUNT:

    case LOGIN_ACCOUNT:
      LoginAccount(action.payload.email, action.payload.password);
      let newState = {

      }
    default: return state;
  }
}