import React from 'react';
import Header from '../Header.js';

import { useTheme } from '@material-ui/core/styles';
import { SlideStyles } from './Style';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useLocation, Link } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function ServiceDetail() {
    const row = useLocation().state; 
    const classes = SlideStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return ( 
        <div class="page">
            <Header/>
            <div className="bread-scrumb">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <Link to="/services">List Services</Link>
                    <Typography color="textPrimary">Service detail - {row[0].serviceName}</Typography>
                </Breadcrumbs>
            </div>
            <div className="sv_container">
                <div className="space"/>
                <Typography variant="h5" align="left" color="secondary" style={{ maxWidth: 700 }}>
                    {row[0].serviceName}
                </Typography>
                <div className="space"/>
                <hr/>
                <div className="space"/>
                <div className={classes.root}>
                    <Paper square elevation={0} className={classes.header}>
                      <Typography>{row[0].images[activeStep].label}</Typography>
                    </Paper>
                    <AutoPlaySwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={activeStep}
                      onChangeIndex={handleStepChange}
                      enableMouseEvents
                    >
                      {(row[0].images).map((i, index) => (
                        <div key={i}>
                          {Math.abs(activeStep - index) <= 2 ? (
                            <img className={classes.img} src={"../images/"+i.url} alt={"Admin"} />
                          ) : null}
                        </div>
                      ))}
                    </AutoPlaySwipeableViews>
                  </div>
                <div className="space"/>
                <Typography variant="body1" gutterBottom>
                    {row[0].description}
                </Typography>
                <div className="space"/>
            </div>
        </div>
    );
  
}