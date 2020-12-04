import {API_URL} from "../Constans/apiConstants";
import {ORDERS_GET} from "../Constans/userConstants";
import axios from 'axios'
import {SUCCESS_MSG} from "../Constans/messageConstant";
import ToastServive from "react-material-toast";

const toast = ToastServive.new({
  place:'topRight',
  duration:2,
  maxCount:20
});

export const getAllOrders = () => {
  return async (dispatch) => {
    return await axios.post(API_URL + '/orders/order-details',
      localStorage.getItem('Authorization')).then(res => {
      let arr = [];
      if (res && res.data && res.data.response.data && res.data.response.data.length > 0){
        arr = [...res.data.response.data];
        console.log(arr);
        dispatch(_getAllOrders(res.data.response.data))
      }
    })
  }
}

export const _getAllOrders = (orders) => ({
  type: ORDERS_GET,
  orders
})

export const deleteOrders = (id) => {
  return async (dispatch) => {
    return await axios.delete(API_URL + '/orders/order-details', {data: {id: id}}).then(res => {
      if (res.status === 200) {
        toast.success(SUCCESS_MSG, () => {
        });
        dispatch(getAllOrders());
      }
    })
  }
}


