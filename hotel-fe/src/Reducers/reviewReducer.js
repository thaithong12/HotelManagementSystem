import {REVIEWS_GET} from "../Constans/reviewConstant";

const initState = {
  reviews: []
}

export default function reviewReducer (state = initState , action) {
  switch (action.type) {
    case REVIEWS_GET:
      let newState = {...state, reviews: action.reviews}
      return newState;
    default: return state;
  }
}
