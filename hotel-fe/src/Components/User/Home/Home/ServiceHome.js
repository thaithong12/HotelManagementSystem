import React, { useEffect } from 'react';
import {

    Link	
  } from "react-router-dom";


import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../../../Actions/serviceAction';
export default function ServiceHome(){

	const dispatch = useDispatch();
    const servicesData = useSelector(state => state.services.services);
    const data = servicesData.slice(0, 2);
    useEffect(() => {
      dispatch(getServices());
    }, []);
	
    return(
        <div className="services">
    		<div className="section-title">
    			<h4>Services</h4>
    			<div></div>
    		</div>
			
    		<div className="services-center">
			{data.map( i => 
    			<div className="services1">
	    			<div className="vt-img">
						<img  src={i.images!=null?'../images/'+i.images[0].url:null} alt="Service"/>
	    			</div>
	    			<div className="vt-content-services">
						<p>{i.description}</p>
						
						<button><Link to={{	pathname: '/services-detail',
                                    state: [i]
                        }}> Read More</Link></button>
						
                        
	    			</div>
    			</div>
    			)}
    			
    		</div>
			
    		
    	</div>
        );
}

