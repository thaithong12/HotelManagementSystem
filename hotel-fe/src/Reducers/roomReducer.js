import {ROOM_GET} from "../Constans/roomConstant";

const initState = {
  rooms: [],
  isLoaded: false
}

export default function roomReducer(state = initState , action) {
  switch (action.type){
    case ROOM_GET: {
        let newState = [...action.rooms];
        return newState;
    }
    default: return state;
  }
}