import React, { useEffect } from 'react';
import {
    Link	
  } from "react-router-dom";
import { useDispatch, useSelector, } from 'react-redux';
import { getPromotions } from '../../../../Actions/promotionActions';
import Moment from 'react-moment';
export default function Banner(){
    const dispatch = useDispatch();
    const promotionData = useSelector(state => state.promotions.promotions);
    
    useEffect(() => {
      dispatch(getPromotions());
    }, []);
    console.log(promotionData[1]);
    return(
      <div>
      {promotionData.map( i =>
        <div class="banner">
          
          <img  class="banner" src="../images/default.jpeg"/>
          <div class="banner-content">
            
            <h1>{i.discount*100}%  Discount Off</h1>
            <div></div>
            <p>From <Moment format="D MMM">{i.sdate}</Moment>  To <Moment format="D MMM">{i.edate}</Moment> </p>
            <Link to="/categories" class="btn-primary">our rooms</Link>
                  
            
          </div>
        
    	</div>)}
      </div>
    );
}