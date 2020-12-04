import React, { useEffect, useState } from 'react';
import {
  Link
} from "react-router-dom";
import { useDispatch, useSelector, } from 'react-redux';
import { getCategories } from '../../../../Actions/roomCategoryAction';
import { setCategoryInfo} from '../../../../Actions/currentCategoriesAction'
import {history} from '../../../../Helper/history'

export default function Accommodation(){
  const dispatch = useDispatch();
  const categoriesData = useSelector(state => state.categories.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function handleDetail(e, i) {
    e.preventDefault();
    const item  = categoriesData.find(item => item.categoryId === i.categoryId);
    dispatch(setCategoryInfo(item));
    history.push('/detailsCategory');
    // console.log(item);
  }
  return(
    <div className="featured-rooms">
      <div className="section-title">
        <h4>Accommodation</h4>
        <div></div>
      </div>

      <div className="featured-rooms-center">
        {categoriesData.map( i =>
          <div className="room room-items">
            <div className="img-container">
              <img src="../images/a.jpg"/>
              <Link className="btn-primary room-link" to={{
                pathname: '/details-category',
                state: [i]
              }}> Read More </Link>

            </div>
            <p className="room-info">{i.categoryName}</p>
          </div>)}

      </div>


    </div>
  );
}
