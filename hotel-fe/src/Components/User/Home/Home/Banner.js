import React from 'react';
import {
    Link	
  } from "react-router-dom";
export default function Banner(){
    return(
        <div class="banner">
    		<div class="banner-content">
    			<h1>20% Discount Off</h1>
    			<div></div>
    			<p>From November 26 to December 12 </p>
                <Link to="/categories" class="btn-primary">our rooms</Link>
    			
    		</div>
    	</div>
        );
}