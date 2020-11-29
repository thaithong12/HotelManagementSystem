
import React from 'react';
import './App.css';
import Admin from './Admin';
import User from './User';
import {history} from './Helper/history'
import {
  Router,
  Route
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


          <Route path="/" component={User}/>
          <Route path="/Dashboard" component={Admin}/>
          <Route path="/login" component={Login}/>

        </Router>
      </div>
    );

}



export default App ;
