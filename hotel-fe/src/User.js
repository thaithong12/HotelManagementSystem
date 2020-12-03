import React from 'react';
import Home from './Components/User/Home/Home/Home';
import './User.css';
import DetailsRoom from './Components/User/Home/DetailsRoom/DetailsRoom';
import Categories from './Components/User/Home/Categories/Categories';
import Promotion from './Components/User/Home/Promotion/Promotion';
import Service from './Components/User/Home/Service/Service';
import Login from "./Login";
import Payment from './Components/User/Home/Payment/Payment';
import {history} from './Helper/history';
import {
  Router,
  Route
} from "react-router-dom";
import PaymentSuccess from './Components/User/Home/Payment/PaymentSuccess'
export default function User() {
    
    return (
      <Router history={history}>
        <Route exact path="/" component={Home}/>
        <Route path="/detailsRoom" component={DetailsRoom}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/promotions" component={Promotion}/>
        <Route path="/services" component={Service}/>
        <Route path="/login" component={Login}/>
        <Route path="/payment" component={Payment}/>
        <Route path="/payment-success" component={PaymentSuccess}/>
      </Router>
    );
  
}


