import React from 'react';
import Header from '../Header'
import Review from './Review'
import BookingBar from './BookingBar'
export default function DetailsRoom(){
    return(
        <div class="container">
            <Header/>
            <div class="details-room">
                <div class = "details-up">
                <div class="details-img">
                    <a href="#">
                        <img  src="../images/room-1.jpeg"  />
                    </a>
                </div>
                    <BookingBar/>
                </div>
                <div class = "details-down">
                    <Review/>
                </div>
            </div>
            
        </div>
        );
}