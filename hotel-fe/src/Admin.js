
import React from 'react';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import './Admin.css';
import ManageBookings from './Components/Admin/Bookings/ManageBookings';
import ManagePromotions from './Components/Admin/Promotions/ManagePromotions';
import ManageCategories from './Components/Admin/RoomCategories/ManageCategories';
import ManageRooms from './Components/Admin/Rooms/ManageRooms';
import ManageServices from './Components/Admin/Services/ManageServices';
import ManageConveniences from './Components/Admin/Conveniences/ManageConveniences';
import {
  Router,
  Route
} from "react-router-dom";
import {history} from './Helper/history'
export default function Admin() {
    
    return (
      <Router history={history}>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route path="/dashboard/bookings" component={ManageBookings}/>
        <Route path="/dashboard/promotions" component={ManagePromotions}/>
        <Route path="/dashboard/categories" component={ManageCategories}/>
        <Route path="/dashboard/rooms" component={ManageRooms}/>
        <Route path="/dashboard/services" component={ManageServices}/>
        <Route path="/dashboard/conveniences" component={ManageConveniences}/>
      </Router>
    );
  
}


