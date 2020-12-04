import React, { useEffect } from 'react';
import {
  Link
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../../../Actions/serviceAction';
export default function ServiceHome(){
  const dispatch = useDispatch();
  const servicesData = useSelector(state => state.services.services);

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
        {servicesData.map( i =>
          <div className="services1">
            <div className="vt-img">
              <img src="../images/room-1.jpeg"/>
            </div>
            <div className="vt-content-services">
              <p>{i.description}</p>
              <button>Read More</button>
            </div>
          </div>
        )}

      </div>


    </div>
  );
}
