import React from 'react';
import Header from '../Header.js';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useLocation, Link } from "react-router-dom";

export default function ServiceDetail() {
    const row = useLocation().state; 
    
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
            <div className="page_container">
                <div className="space"/>
                <Typography variant="h5" align="left" color="secondary" style={{ maxWidth: 700 }}>
                    {row[0].serviceName}
                </Typography>
                <div className="space"/>
                <hr/>
                <div className="space"/>
                <Typography variant="body1" gutterBottom>
                    {row[0].description}
                </Typography>
                <div className="space"/>
                <img 
                src="https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg"
                alt="new"
                />
            </div>
        </div>
    );
  
}