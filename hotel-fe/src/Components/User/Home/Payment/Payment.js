import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import axios from 'axios'
import {API_URL} from "../../../../Constans/apiConstants";
import {Link, useLocation} from 'react-router-dom';
import './PaymentStyle.css';
export default function Payment(){
    const [totalPrice, setTotalPrice] = useState();

    const dispatch = useDispatch();
    const [url, setUrl] = useState("");
    const data2 = useLocation().state.booking;
    const data1 = useLocation().state.customer;
    const data = useLocation().state.bookinfo;
    console.log(data);
    const pay = (totalPrice, prePayment) => {
        axios.post(API_URL+'/pay',{totalPrice, prePayment})
        .then(result => {
            if (result.status === 200 && result.data) {
                window.open(result.data);
            }
        });

    }
    return(
        <div id="body">
         <div id ="confirm">	
		   <div id="title">	
	         <br/><h2>BOOKING DETAILS</h2><br/>
	       </div>
	       <div id="confirm-form">
	         <br/>
           <p>Customer Name: {data.customerName}</p>
           <p>Room Category: {data.roomCode}</p>
	         <p>Check-in date: {data.checkIn}</p>
           <p>Check-out date: {data.checkOut}</p>
	         <p>Guests: {data2.numberOfPeople}</p>
	         <p>Services: {data2.service.length > 0 ? data2.service.map((val, index) => (
              <span style={{color: "green"}}>{val} </span>
            )) : ''}</p>
	         <p>Voucher: {data.promotionCode}</p>
	         <p>Pay in full/ deposit: {data1.method === 'full' ? "Full" : "Deposit"} </p><br/>
	       </div>  
	       <div id="amount">
	       	 <br/><p id="show-amount">Total amount: {data.totalPrice}</p> <br/>
	       </div>
           <div id="button-pay" >
              <Button onClick={()=>{data1.method === 'full' ? pay(data.totalPrice, data.totalPrice) : pay(data.totalPrice, data.totalPrice*2)}}>Pay</Button>
           </div>
         </div>
            
      </div> 
        );
}