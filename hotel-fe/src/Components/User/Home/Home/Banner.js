import React, { useEffect } from 'react';
import {
  Link
} from "react-router-dom";
import { useDispatch, useSelector, } from 'react-redux';
import { getPromotions } from '../../../../Actions/promotionActions';
export default function Banner(){
  const dispatch = useDispatch();
  const promotionData = useSelector(state => state.promotions.promotions);

  useEffect(() => {
    dispatch(getPromotions());
  }, []);

  return(
    <div class="banner">
      {promotionData.map( i =>
        <div class="banner-content">
          <h1>{i.discount} Discount Off</h1>
          <div></div>
          <p>From {i.sdate} to {i.edate} </p>
          <Link  to="/categories" class="btn-primary">our rooms</Link>

        </div>
      )}
    </div>
  );
}
