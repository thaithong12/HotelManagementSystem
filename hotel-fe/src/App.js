import React, {useEffect, useState} from 'react';
import './App.css';
import Admin from './Admin';
import {history} from './Helper/history'
import  {
  Router,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login";
import "./Interceptors";
import {useSelector} from "react-redux";

function App() {
  let [curUser, setUser] = useState({});
  let user = useSelector(state => state.user);

  useEffect(() => {
    setUser(user);
  }, [user]);



  function handleClickAdmin(e) {
    e.preventDefault();
    if (curUser.isAdmin) {
      history.push('/Dashboard')
    } else {
      history.push('/');
    }
  }

  return (
    <div className="App">
      <Router history={history}>
        <div>
          <header>

            <Link onClick={(e) => handleClickAdmin(e)}>Dashboard</Link>
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

function Home(props) {
  console.log(props.match);
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

function Dashboard() {

  return (
    <Admin/>
  )
}

export default App;
