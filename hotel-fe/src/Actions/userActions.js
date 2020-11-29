import * as types from '../Constans/userConstants';
import {END_POINT_LOGIN, END_POINT_REGISTER} from '../Constans/userConstants';
import axios from 'axios'
import {API_URL} from "../Constans/apiConstants";
import ToastServive from 'react-material-toast';

const toast = ToastServive.new({
  place:'topRight',
  duration:2,
  maxCount:20
});

export const login = (userRequest = {email: '', password: ''}) => {
  return async (dispatch) => {
    const user = {
      email: userRequest.email,
      password: userRequest.password
    }
    return await axios.post(API_URL + END_POINT_LOGIN, user).then(res => {
      if (res.data) {
        const obj = {...res.data};
        obj.jwttoken = "Token " + obj.jwttoken;
        localStorage.setItem("Authorization", res.data.jwttoken);

        dispatch(_login(res.data));
      } else {
        toast.error("Username or Password not valid", () => {
          // console.log(err);
        })
      }
    }).catch(err => {

    })
  }
}
export const _login =(user) => ({
  type: types.LOGIN_ACCOUNT,
  user
})

export function register(obj) {
  const user = {...obj}
  return async (dispatch) => {
    return await axios.post(API_URL + END_POINT_REGISTER, user).then(res => {
      toast.success('Register Success', () => {
        console.log('closed')
      });

    }).catch(err => {
      toast.error('Email Exists', () => {
        console.log(err);
      })
    })
  }
}

export const _register = (user) => ({
  type: types.END_POINT_REGISTER,
  user
})

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    window.location.href('/');
    dispatch(_logout());
  }
}
export const _logout = () => ({
  type: types.LOGOUT_ACCOUNT,
})
