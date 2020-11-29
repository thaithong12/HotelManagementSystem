
const initialState = {
    promotions: []
  };
 
export  default function promotionReducer(state = initialState, action)  {
    switch (action.type) {
        case 'ADD_PROMOTION':
            
            let addState = {...state,promotions: action.promotions }
            return addState;
            
        case 'REMOVE_PROMOTION':
             let removeState = {promotions: state.promotions.filter((item)=> item.promotionId!==action.promotion.promotionId) }
             return removeState;
       

        case 'GET_PROMOTIONs':
            
            let newState = {...state,promotions: action.promotions }
            return newState;
        default:
            return state;
    }
};