import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import axios from 'axios'
import {API_URL} from "../../../../Constans/apiConstants";
import {Link} from 'react-router-dom';
import './PaymentStyle.css';
export default function Payment(){
    const [totalPrice, setTotalPrice] = useState();
    const dispatch = useDispatch();
    const [url, setUrl] = useState("");

    const pay = (totalPrice) => {
        axios.post(API_URL+'/pay',{totalPrice})
        .then(result => {
            if (result.status === 200 && result.data) {
                window.open(result.data);
            }
        });


    }

    return(
        <div>
         <div id ="confirm">	
		   <div id="title">	
	         <br/><h2>BOOKING DETAILS</h2><br/>
	       </div>
	       <div id="confirm-form">
	         <br/><p>Room Category: Deluxe</p>
	         <p>Check-in date: 2021/01/01</p>
	         <p>Check-out date: 2021/01/15</p>
	         <p>Guests: 5</p>
	         <p>Services: </p>
	         <p>Voucher: 30%</p>
	         <p>Pay in full/ deposit: full </p><br/>
	       </div>  
	       <div id="amount">
	       	 <br/><p id="show-amount">Total amount: 10$</p> <br/>
	       </div>
           <div>
              <Button onClick={()=>{pay(10)}}>Pay</Button>
           </div>
         </div>
            
        </div> 
        );
}