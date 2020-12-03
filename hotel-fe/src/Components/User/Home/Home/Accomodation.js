import React from 'react';
import {
    Link	
  } from "react-router-dom";
export default function Accommodation(){
    return(
        <div class="featured-rooms">
    		<div class="section-title">
    			<h4>Accommodation</h4>
    			<div></div>
    		</div>
    		<div class="featured-rooms-center">
    			<div class="room">
    				<div class="img-container">
    					{/* <img src="images/room-8.jpeg"> */}
    					<Link to="/" class="btn-primary room-link">see more</Link>
    					
    				</div>
    				<p class="room-info">Deluxe Room</p>
    			</div>
    			<div class="room">
    				<div class="img-container">
    					{/* <img src="images/room-4.jpeg"> */}
    					
    					<Link to="/" class="btn-primary room-link">see more</Link>
    				</div>
    				<p class="room-info">Family Room</p>
    			</div>
    			<div class="room">
    				<div class="img-container">
    					{/* <img src="images/room-3.jpeg"> */}
    					
    					<Link to="/" class="btn-primary room-link">see more</Link>
    				</div>
    				<p class="room-info">Royal Room</p>
    			</div>
    		</div>
    		
    		
    	</div>
        );
}