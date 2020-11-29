
import React, { Component } from 'react';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import './Admin.css';
import ManageBookings from './Components/Admin/Bookings/ManageBookings';
import ManagePromotions from './Components/Admin/Promotions/ManagePromotions';
import ManageCategories from './Components/Admin/RoomCategories/ManageCategories';
import ManageRooms from './Components/Admin/Rooms/ManageRooms';
import ManageServices from './Components/Admin/Services/ManageServices';
import ManageConveniences from './Components/Admin/Conveniences/ManageConveniences';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Home() {

    return (
      <Router>
          <Page/>
      </Router>
    );
  
}
function Page(){
  return(
    <div>
      
      
      
      <h2>HomePage</h2>
      
      
       
      
    </div>
  )
}

