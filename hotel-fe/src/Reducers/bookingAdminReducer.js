
const initState = {
    bookings: []
    
  }
  
  export default function bookingAdminReducer(state = initState , action) {
    switch (action.type){
      case 'get_bookings': {
          let newStateBooking = [...action.bookings];
          return newStateBooking;
      }
      default: return state;
    }
  }