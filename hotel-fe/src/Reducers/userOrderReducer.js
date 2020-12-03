import {ORDERS_GET} from "../Constans/userConstants";

const initState = {
  orders: [],
  isLoaded: false
}

export default function userOrderReducer(state = initState , action) {
  switch (action.type){
    case ORDERS_GET: {
      let newState = action.orders;
      return newState;
    }
    default: return state;
  }
}
