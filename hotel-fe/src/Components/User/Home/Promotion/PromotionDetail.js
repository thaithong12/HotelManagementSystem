import React from 'react';
import Header from '../Header.js';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useLocation, Link } from "react-router-dom";

import Typography from '@material-ui/core/Typography';


export default function PromotionDetail() {
    const row = useLocation().state; 
    
    return ( 
        <div class="page">
            <Header/>
            <div className="bread-scrumb">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <Link to="/promotions">List Promotions</Link>
                    <Typography color="textPrimary">Promotion detail</Typography>
                </Breadcrumbs>
            </div>
            <div className="pr_container">
                <div className="space"/>
                <Typography variant="h5" align="left" color="secondary" style={{ maxWidth: 700 }}>
                    {row[0].code}
                </Typography>
                <div className="space"/>
                <hr/>
                <div className="space"/>
                
                <img src={"../images/"+row[0].image} alt={"Admin"} style={{ height: 600, maxWidth: 800 }}/>            
                <div className="space"/>
                <Typography variant="body1" gutterBottom>
                    {row[0].description}
                </Typography>
                <div className="space"/>
                <Typography variant="h6" align="left" color="secondary" style={{ maxWidth: 700 }}>
                    DISCOUNT : {row[0].discount}
                </Typography>
                
                <Typography variant="h6" align="left" color="primary" style={{ maxWidth: 700 }}>
                    From : {row[0].sdate} - To : {row[0].edate}
                </Typography>
            </div>
        </div>
    );
  
}