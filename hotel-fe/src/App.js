
import React, { Component } from 'react';
import './App.css';
import Admin from './Admin';

import Home from './Home';
// import Home from './Components/User/Home/Home/Home.js';
import DetailsRoom from './Components/User/Home/DetailsRoom/DetailsRoom.js';
import ListRoom from './Components/User/Home/ListRoom/ListRoom.js';
import Promotion from './Components/User/Home/Promotion/Promotion.js';
import Service from './Components/User/Home/Home/Home.js';

import {history} from './Helper/history'

import {
  Router,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login";

import {
  createBrowserHistory
  
} from 'history'

function App() {

    return (
      <div className="App">
        <Router history={history}>

            <div>
            <header>
              
              <Link to="/Dashboard">Dashboard</Link>
              <Link to={'/login'}>Login</Link>
            </header>
            <main>
              
              <Route exact path="/" component={Home}/>
              <Route path="/Dashboard" component={Dashboard}/>
              <Route path="/login" component={Login}/>
              
            </main>
            <footer>

            </footer>
            
            
            </div>

        </Router>
      </div>
    );
  
}



function Dashboard() {
  
  return(
    <Admin/>
  )
}


export default App ;
