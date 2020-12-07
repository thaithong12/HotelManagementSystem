import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {history} from "../../../Helper/history";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../Actions/userActions";

export default function Header() {


  let [curUser, setUser] = useState({});
  let user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(user);
  }, [user]);

  function handleClickAdmin(e) {
    e.preventDefault();
    history.push('/Dashboard')
  }

  function handleLoggout(e) {
    e.preventDefault();
    dispatch(logout())
  }

  console.log(curUser)

  return (
    <div>
      <nav class="navbar">
        <div class="nav-center">
          <div class="nav-header">
            <Link to="/">
              <img src="../images/logo.jpg" alt="Hotel"/>
            </Link>


          </div>
          <ul class="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/promotions">Promotions</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            {/*<li>*/}
            {/*  <Link to="/payment">Payment</Link>*/}
            {/*</li>*/}
            {curUser && curUser.loggedIn ?
              <li>
                <Link onClick={(e) => handleLoggout(e)}>Logout</Link>
              </li> :
              <li>
                <Link to="/login">Login</Link>
              </li>
              
            }

            {(curUser && curUser.isAdmin) ?
              <li>
                <Link onClick={(e) => handleClickAdmin(e)}>Admin</Link>
              </li> :
              (curUser && curUser.isAdmin === false) ?
              <li>
                <Link onClick={(e) => handleClickAdmin(e)}>User</Link>
              </li>: ''
            }

          </ul>
        </div>
      </nav>
    </div>
  )
}

