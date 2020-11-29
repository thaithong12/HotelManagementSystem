
import React, { Component } from 'react';
import './App.css';
import Admin from './Admin';
import User from './User';
import {history} from './Helper/history'
import {
  Router,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login";



function App() {

    return (
      <div className="App">
        <Router history={history}>


          <Route path="/" component={User}/>
          <Route path="/Dashboard" component={Admin}/>
          <Route path="/login" component={Login}/>

        </Router>
      </div>
    );
  
}



export default App ;
