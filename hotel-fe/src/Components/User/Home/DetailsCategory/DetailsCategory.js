import React, { useEffect, useState } from 'react';
import Header from '../Header'
import Review from './Review'
import BookingBar from './BookingBar';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { useLocation, Link } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import Paper from '@material-ui/core/Paper';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function DetailsCategory(){
    
    // const categoriesData = useSelector(state => state.currentCategoryReducer);
    const row = useLocation().state; 
    const [activeStep, setActiveStep] = React.useState(0);
    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    return(
        <div class="container">
            <Header/>
            <div className="bread-scrumb">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <p>{row[0].categoryName}</p>
                </Breadcrumbs>
            </div>
            <div class="details-room">
                <div class = "details-up">
                    <div class="details-img">
                        
                        <AutoPlaySwipeableViews
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        >
                            {(row[0].images).map((i, index) => (
                                <div key={i}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <img className="" src={"../images/"+i.url} alt={"Accomodation"} />
                                ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <h6>{row[0].categoryName}</h6> 
                        
                    </div>
                    
                    
                              
                        <BookingBar/>
                    </div>
                    
                </div>
                <div class = "details-down">
                    <div className = "details-down-left">
                        <div class="details-description">
                                <h6>rating</h6>
                                <p>{row[0].description}</p>
                        </div>
                        <div class="details-convenience">
                            <h6>convenience</h6>
                        </div>
                    </div>
                    
                    <Review/>
                </div>
        </div>
    ); 
        
}