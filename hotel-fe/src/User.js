import React from 'react';
import Home from './Components/User/Home/Home/Home';
import './User.css';
import DetailsCategory from './Components/User/Home/DetailsCategory/DetailsCategory';
import Categories from './Components/User/Home/Categories/Categories';

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
import Gallery from './Components/User/Home/Gallery/Gallery';
import AboutUs from './Components/User/Home/AboutUs/AboutUs';
import ListPromotion from './Components/User/Home/Promotion/ListPromotion';
import PromotionDetail from './Components/User/Home/Promotion/PromotionDetail';
export default function User() {
    
    return (
      <Router history={history}>
        <Route exact path="/" component={Home}/>
        <Route path="/details-category" component={DetailsCategory}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/promotions" component={ListPromotion}/>
        <Route path="/promotions-detail" component={PromotionDetail}/>
        <Route path="/services" component={ListServices}/>
        <Route path="/services-detail" component={ServiceDetail}/>
        <Route path="/payment" component={Payment}/>
        <Route path="/payment-success" component={PaymentSuccess}/>
        <Route path="/booking-info" component={BookingInfo}/>
        <Route path="/gallery" component={Gallery}/>
        <Route path="/about-us" component={AboutUs}/>
      </Router>
    );
  
}

