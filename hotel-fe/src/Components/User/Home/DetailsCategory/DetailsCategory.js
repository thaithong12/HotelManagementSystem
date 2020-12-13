import React from 'react';
import Header from '../Header'
import Review from './Review'

import BookingBar from './BookingBar';

import { useLocation, Link } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default function DetailsCategory(){
    
    // const categoriesData = useSelector(state => state.currentCategoryReducer);
    const row = useLocation().state; 
    const [activeStep, setActiveStep] = React.useState(0);
    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    const convenienceData = row[0].convenientEntities;
    console.log(convenienceData);
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
                        <h6>convenience</h6>
                        <div class="details-convenience">

                                
                                {convenienceData.map( i =>
                                   
                                    <div className=  "details-convenience-content">
                                        <CheckCircleOutlineIcon/>{i.convenientName}
                                    </div>
                                        
                                    
                                )}
                                
                        </div>
                    </div>
                    
                    <Review/>
                </div>
        </div>
    ); 
        
}

