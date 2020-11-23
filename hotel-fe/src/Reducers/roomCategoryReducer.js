const initialState = {
    categories: []
};

export default function roomCategoryReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_CATEGORYs':
            let newGet = {...state,categories: action.categories}
            return newGet;

        case 'DELETE_CATEGORY':
            let newDelete = {categories: state.categories.filter((item)=> item.categoryId!==action.categories.categoryId)}
            return newDelete;

        default:
            return state;
    }
};
