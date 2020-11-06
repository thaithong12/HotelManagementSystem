import React from 'react';
import axios from 'axios';
import {API_URL} from '../Constans/apiConstants'
import {END_POINT_LOGIN,END_POINT_REGISTER} from '../Constans/userConstants'

export async function   LoginAccount(email , password) {
  let account = {email: email , password: password};
  await axios.post(API_URL + END_POINT_LOGIN, account).then(res => {
    localStorage.setItem("Authorization", res.data);
  }).catch(err => {
    alert("Authentication failure");
  })
}

export function Register(obj) {

}
