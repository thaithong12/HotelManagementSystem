
import React, { Component } from 'react';
import './App.css';
import Admin from './Admin';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {

    return (
      <div className="App">
        <Router>
          <Page/>
        </Router>
        
        
      </div>
    );
  
}



function Page(){
  return(
    <div>
      <header>
        
        <Link to="/Dashboard">Dashboard</Link>
      </header>
      <main>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Dashboard" component={Dashboard}/>
      </Switch> 
      </main>
      <footer>

      </footer>
       
      
    </div>
  )
}

function Home(props) {
  console.log(props.match);
  return(
    <div>
      <h2>Home</h2>
    </div>
  )
}
function Dashboard() {
  
  return(
    <Admin/>
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