import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function SlideBar() {

  const user = useSelector(state => state.user);
  const [curUser, setUser] = useState({});

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <aside className="menu-sidebar">
      <div className="logo">
        <Link to="/dashboard">
          <img src="../images/logo1.png" alt="Admin"/>
        </Link>


      </div>
      <div className="menu-sidebar__content">
        <nav className="navbar-sidebar">
          <ul className="navbar__list">
            {curUser && curUser.isAdmin ?
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashboard/rooms">Rooms</Link>
                </li>
                <li>
                  <Link to="/dashboard/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/dashboard/bookings">Bookings</Link>
                </li>
                <li>
                  <Link to="/dashboard/promotions">Promotions</Link>
                </li>
                <li>
                  <Link to="/dashboard/services">Services</Link>
                </li>

                <li>
                  <Link to="/dashboard/conveniences">Conveniences</Link>
                </li>
              </> :
              <li>
                <Link to="/dashboard/orders">Orders</Link>
              </li>
            }
          </ul>
        </nav>
      </div>
    </aside>
  )

}
