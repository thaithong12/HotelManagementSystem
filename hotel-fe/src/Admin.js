import React, {useEffect, useState} from 'react';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import './Admin.css';
import ManageBookings from './Components/Admin/Bookings/ManageBookings';
import ManagePromotions from './Components/Admin/Promotions/ManagePromotions';
import ManageCategories from './Components/Admin/RoomCategories/ManageCategories';
import ManageRooms from './Components/Admin/Rooms/ManageRooms';
import ManageServices from './Components/Admin/Services/ManageServices';
import ManageConveniences from './Components/Admin/Conveniences/ManageConveniences';
import {Route, Router} from "react-router-dom";
import {history} from './Helper/history'
import ManageOrders from "./Components/Admin/Orders/ManageOrders";

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
      <Route path="/dashboard/orders" component={ManageOrders}/>
    </Router>
  );

}


