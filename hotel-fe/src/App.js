
import React, { Component } from 'react';
import './App.css';
import Admin from './Admin';
import Home from './Home';
// import Home from './Components/User/Home/Home/Home.js';
import DetailsRoom from './Components/User/Home/DetailsRoom/DetailsRoom.js';
import ListRoom from './Components/User/Home/ListRoom/ListRoom.js';
import Promotion from './Components/User/Home/Promotion/Promotion.js';
import Service from './Components/User/Home/Home/Home.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login";

import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  
} from 'history'
const history = createBrowserHistory()
function App() {

    return (
      <div className="App">
        <Router history={history}>
          <Page/>
        </Router>
        
        
      </div>
    );
  
}



function Page(){
  return(
    <div>
      <header>
        <Link to="/">Home</Link>
        <Link to={'/Dashboard'}>Dashboard</Link>
        <Link to={'/login'}>Login</Link>
      </header>
      <main>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Dashboard" component={Admin}/>
        <Route path="/login" component={Login}/>

    </Switch> 
    </main>
    <footer>

    </footer>
       
      
    </div>
  )
}



function About() {
  
  return(
    <div>
      <h2>About</h2>
    </div>
  )
}


export default App ;
