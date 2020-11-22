
const initialState = {
    services: []
};

export default function serviceReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_SERVICEs':
            let newGet = {...state,services: action.services}
            return newGet;

        case 'DELETE_SERVICE':
            let newDelete = {services: state.services.filter((item)=> item.serviceId!==action.services.serviceId)}
            return newDelete;

        default:
            return state;
    }
};
