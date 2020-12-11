import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../../../Actions/serviceAction';
import { useStyles } from './Style';
import Header from '../Header.js';

import './Service.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from "react-router-dom";

export default function ListServices() {
    const dispatch = useDispatch();
    const servicesData = useSelector(state => state.services.services);
    
    useEffect(() => {
      dispatch(getServices());
    }, []);

    const classes = useStyles();
    return(
        <div class="container">
            <Header/>
            <div>
                <div className="bread-scrumb">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <Typography color="textPrimary">List Services</Typography>
                </Breadcrumbs>
            </div>
            {servicesData.map( row => 
            <div className="page-wrapper">
                <Card className={classes.root} key={row}>
                    <CardActionArea>
                        <Link to={{ pathname: '/services-detail', state: [row] }}/>
                            <CardMedia
                            className={classes.media}>
                                <img style={{height: 550,width: 800}} src={row.images!=null?'../images/'+row.images[0].url:null} alt="Admin"/>
                            </CardMedia>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {row.serviceName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {row.description}
                            </Typography>
                            </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" >
                                <Link to={{
                                    pathname: '/services-detail',
                                    state: [row]
                                }}> Read More </Link>
                        </Button>
                    </CardActions>
                </Card>
                </div>
            )}  
            </div>
            
        </div>
    )}
