import React, { useEffect, useState } from 'react';
import {

    Link	
  } from "react-router-dom";
import { useDispatch, useSelector, } from 'react-redux';

import { getCategories } from '../../../../Actions/roomCategoryAction';


export default function Accommodation(){

	const dispatch = useDispatch();
    const categoriesData = useSelector(state => state.categories.categories);
	const data = categoriesData.slice(0, 3);    // lấy 3 phần tử đầu để in ra
	
    useEffect(() => {
      dispatch(getCategories());
	}, []);
	
	
    return(
        <div className="featured-rooms">
    		<div className="section-title">
    			<h4>Accommodation</h4>
    			<div></div>
    		</div>
			
    		<div className="featured-rooms-center">
			{data.map( i => 
    			<div className="room room-items">
                    <div className="img-container">
                        <img  src={i.images!=null?'../images/'+i.images[0].url:null} alt="Accomodation"/>
                        
                        <Link className="btn-primary room-link" to={{
                                    pathname: '/details-category',
                                    state: [i]
                        }}> 
						See More 
						</Link>
                    </div>
                    <p className="room-info">{i.categoryName}</p>
                </div>)}
    			
    		</div>
    		
			
    	</div> 
        );
}

