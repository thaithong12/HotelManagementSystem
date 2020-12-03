import React from 'react';
import {
    Link	
  } from "react-router-dom";
export default function Header() {
        return(
        <div >
    		<nav class="navbar">
		        <div class="nav-center">
		          <div class="nav-header">
				  <Link to="/">
				  	<img  src="../images/logo.jpg" alt="Hotel" />
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
                        <Link to="/">Gallery</Link>
		            </li>
		            <li>
                        <Link to="/">About Us</Link>
		            </li>
					<li>
                        <Link to="/login">Login</Link>
		            </li>
					<li>
                        <Link to="/Dashboard">Admin</Link>
		            </li>
					<li>
                        <Link to="/payment">Payment</Link>
		            </li>
		          </ul>
		        </div>
	     	</nav>
    	</div>
        )
}