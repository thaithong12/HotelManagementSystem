import {LOGIN_ACCOUNT, LOGOUT_ACCOUNT} from "../Constans/userConstants";


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

    default: return state;
  }
}
