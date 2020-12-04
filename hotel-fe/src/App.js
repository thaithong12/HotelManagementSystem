import React, {useEffect, useState} from 'react';
import './App.css';
import Admin from './Admin';
import {history} from './Helper/history'
import {Route, Router} from "react-router-dom";
import Login from "./Login";
import "./Interceptors";
import User from "./User";

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


export default App;