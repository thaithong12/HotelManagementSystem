import * as types from '../Constans/userConstants';
import axios from 'axios'
import {API_URL} from "../Constans/apiConstants";
import {END_POINT_LOGIN} from "../Constans/userConstants";

export const login = (userRequest = {email: '', password: ''}) => {
  return async (dispatch) => {
    const user = {
      email: userRequest.email,
      password: userRequest.password
    }
    return await axios.post(API_URL + END_POINT_LOGIN, user).then(res => {
      localStorage.setItem("Authorization", "Token " + res.data.jwttoken);
      dispatch(_login(res.data));
    }).catch(err => {
      alert("Authentication failure");
    })
  }
}
export const _login = (user) => ({
  type: types.LOGIN_ACCOUNT,
  user
})

export function logout() {
  return {

  }
}

export function register(obj) {

}
