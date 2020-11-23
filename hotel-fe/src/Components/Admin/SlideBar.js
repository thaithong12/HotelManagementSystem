import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function SlideBar() {
    
    return (
        <aside className="menu-sidebar">
        <div className="logo">
            <Link to="/dashboard">
            <img src="../images/logo1.png" alt="Admin" />
            </Link>
                
            
        </div>
        <div className="menu-sidebar__content">
            <nav className="navbar-sidebar">
                <ul className="navbar__list">
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
                        
                        
                </ul>
            </nav>
        </div>
        </aside>
    )
    
}