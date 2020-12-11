import axios from 'axios'
import {API_URL} from "../Constans/apiConstants";
import ToastServive from 'react-material-toast';
import {SUCCESS_MSG, ERR_MSG} from "../Constans/messageConstant";
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:20
});
export const _getAllBookings = (bookings) => ({
  type: 'get_bookings',
  bookings
});
export const getAllBookings = () => {
    return async (dispatch) => {
      return axios.get(API_URL + '/orders').then(res => {
        console.log(res.data.response)
        dispatch(_getAllBookings(res.data.response.data));
      }).catch(err => {
        console.log(err)
      })
    }
}  
export const _deleteBooking = (booking) => ({
    type: 'delete_booking',
    booking
});

export const deleteBooking = (booking) => {
    return async (dispatch) => {
      axios.delete(API_URL + '/orders',{data: booking}).then(res => {
        if (res.status === 200 ) {
          toast.success(SUCCESS_MSG, () => {});
          dispatch(getAllBookings());
        }
      }).catch(err => {
        console.log(err)
      })
    }
}
export const _addBooking = (booking) => ({
  type: 'add_booking',
  booking
})
export const addBooking = (booking) => {
  return async (dispatch) => {
    await axios.post(API_URL + '/orders', {data: [booking]}).then(res => {
      if (res.status === 200) {
        dispatch(getAllBookings());
        console.log("in AddBooking");
        console.log(booking);
        if(booking.status !== 'UNPAID') {
          toast.success(SUCCESS_MSG, () => {
            console.log('closed')
          }); }
      }
    }).catch(err => {
      console.log(err)
      toast.error(ERR_MSG, () => {
        console.log('closed')
      });
    })
  }
}