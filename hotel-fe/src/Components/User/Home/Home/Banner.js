import React, { useEffect, useState } from 'react';
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
    function formatDate(date) {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
  
      return [year, month, day].join('-');
    }
    const today = formatDate(Date.now());
    let listData = {};
    if (promotionData && promotionData.length > 0 ){
      let arr = []
      arr = promotionData.filter(item=> item.sdate <= today && item.edate >= today ) [0];
      listData = arr ;
    }
      
    return(
     
      <div>
      
      {listData ?
          <div className="banner">
            
            <img className="banner"  src={listData.image!=null?'../images/'+listData.image:''} alt="Admin"/>
            <div className="banner-content">
              
              <h1>{listData.discount*100}%  Discount Off</h1>
              <div></div>
              <p>From <Moment format="D MMM">{listData.sdate}</Moment>  To <Moment format="D MMM">{listData.edate}</Moment> </p>
              <Link to="/categories" className="btn-primary">our rooms</Link>
                    
              
            </div>
          
        </div>: '' }
        </div>
      );
}

