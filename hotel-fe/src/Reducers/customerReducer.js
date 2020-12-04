

let user = JSON.parse(localStorage.getItem('user'));
const initState = user ? { ... user} : {}

export default function customerReducer(state = initState , action) {
  switch (action.type) {
    case 'SET_CUSTOMER_INFO':
      let newState = {...action.customer};
      return newState;
    case 'REMOVE_CUSTOMER_INFO':
      return {};
    default: return state;
  }
}
