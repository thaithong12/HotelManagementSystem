

const initState = {
  categoryId: '',
  categoryName: '',
  description: '',
  maximumPeopleOfRoom: 0,
  images: [],
  reviews: [],
  convenientEntities: []
}

export default function categoryReducer(state = initState , action) {
  switch (action.type) {
    case 'SET_CATEGORY_INFO':
      let newState = action.category
      return newState;
      
    case 'REMOVE_CATEGORY_INFO':
      return {};
    default: return state;
  }
}
