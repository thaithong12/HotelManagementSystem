import * as types from '../Constans/userConstants';

export function login(obj) {
  return {
    type: types.LOGIN_ACCOUNT,
    payload: {
      email: obj.email,
      password: obj.password
    }
  }
}

export function logout() {
  return {

  }
}

export function register(obj) {

}
