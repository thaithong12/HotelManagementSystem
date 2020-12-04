import React, { useEffect, useState } from 'react';
import Header from '../Header'
import Review from './Review'
import BookingBar from './BookingBar'
import { useSelector } from 'react-redux';
import {useLocation, Link } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';

export default function DetailsCategory(){
  const row = useLocation().state;
  return(
    <div class="container">
      <Header/>
      <div className="bread-scrumb">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <Typography color="textPrimary">Service detail - {row[0].categoryName}</Typography>
        </Breadcrumbs>
      </div>
      <div class="details-room">
        <div class = "details-up">
          <div class="details-img">
            <a href="#">
              <img  src="../images/room-1.jpeg" />
            </a>
            <p>{row[0].categoryName}</p>
          </div>
          <BookingBar/>
        </div>
        <div class = "details-down">
          <div class="details-img">


          </div>
          <Review/>
        </div>
      </div>

    </div>
  );
}
