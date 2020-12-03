import axios from 'axios'
import {API_URL} from "../Constans/apiConstants";
import {END_POINT_ROOM, ROOM_ADD,ROOM_GET} from "../Constans/roomConstant";
import ToastServive from 'react-material-toast';
import {SUCCESS_MSG, ERR_MSG} from "../Constans/messageConstant";

const toast = ToastServive.new({
  place:'topRight',
  duration:2,
  maxCount:20
});

export const getAllRooms = () => {
  return async (dispatch) => {
    return axios.get(API_URL + END_POINT_ROOM).then(res => {
      console.log(res.data.response)
      dispatch(_getAllRooms(res.data.response.data));
    }).catch(err => {
      console.log(err)
    })
  }
}
export const _getAllRooms = (rooms) => ({
  type: ROOM_GET,
  rooms
})

export const _addRoom = (data) => ({
  type: ROOM_ADD,
  data
})

export const addRoom = (obj) => {
  return async (dispatch) => {
    await axios.post(API_URL + END_POINT_ROOM, {data: [obj]}).then(res => {
      if (res.status === 200) {
        dispatch(getAllRooms());
        toast.success(SUCCESS_MSG, () => {
          console.log('closed')
        });
      }
    }).catch(err => {
      console.log(err)
      toast.error(ERR_MSG, () => {
        console.log('closed')
      });
    })
  }
}

export const deleteRoom = (obj) => {
  return async (dispatch) => {
    axios.delete(API_URL + END_POINT_ROOM,{data: obj}).then(res => {
      if (res.status === 200 ) {
        toast.success(SUCCESS_MSG, () => {});
        dispatch(getAllRooms());
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
