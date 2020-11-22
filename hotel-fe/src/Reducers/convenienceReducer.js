const initialState = {
    conveniences: []
};

export default function convenienceReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_CONVENIENCEs':
            let newState = {...state,conveniences: action.conveniences}
            return newState;

        case 'DELETE_CONVENIENCE':
            let newObj = {conveniences: state.conveniences.filter((item)=> item.convenientId!==action.conveniences.convenientId)}
            return newObj;
        
        default:
            return state;
    }
};
