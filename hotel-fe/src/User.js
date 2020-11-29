import React from 'react';
import Home from './Components/User/Home/Home/Home';
import './User.css';
import DetailsRoom from './Components/User/Home/DetailsRoom/DetailsRoom';
import Categories from './Components/User/Home/Categories/Categories';
import Promotion from './Components/User/Home/Promotion/Promotion';
import Service from './Components/User/Home/Service/Service';
import Login from "./Login";
import {history} from './Helper/history';
import {
  Router,
  Route
} from "react-router-dom";
export default function User() {
    
    return (
      <Router history={history}>
        <Route exact path="/" component={Home}/>
        <Route path="/detailsRoom" component={DetailsRoom}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/promotions" component={Promotion}/>
        <Route path="/services" component={Service}/>
        <Route path="/login" component={Login}/>
      </Router>
    );
  
}


