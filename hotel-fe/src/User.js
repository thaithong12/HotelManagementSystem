import React from 'react';
import Home from './Components/User/Home/Home/Home';
import './User.css';
import DetailsCategory from './Components/User/Home/DetailsCategory/DetailsCategory';
import Categories from './Components/User/Home/Categories/Categories';
import Promotion from './Components/User/Home/Promotion/Promotion';

import Login from "./Login";
import Payment from './Components/User/Home/Payment/Payment';

import BookingInfo from "./Components/User/Home/BookingInfo/BookingInfo";

import {history} from './Helper/history';
import {
  Router,
  Route
} from "react-router-dom";
import PaymentSuccess from './Components/User/Home/Payment/PaymentSuccess'
import './User.css'
import ServiceDetail from './Components/User/Home/Service/ServiceDetail';
import ListServices from './Components/User/Home/Service/ListService';
export default function User() {
    
    return (
      <Router history={history}>
        <Route exact path="/" component={Home}/>
        <Route path="/details-category" component={DetailsCategory}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/promotions" component={Promotion}/>
        <Route path="/services" component={ListServices}/>
        <Route path="/services-detail" component={ServiceDetail}/>
        <Route path="/payment" component={Payment}/>
        <Route path="/payment-success" component={PaymentSuccess}/>
        <Route path="/booking-info" component={BookingInfo}/>
      </Router>
    );
  
}


