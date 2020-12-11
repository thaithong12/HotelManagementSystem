import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotions } from "../../../../Actions/promotionActions";
import { useStyles } from './Styles';
import Header from '../Header.js';

import './Promotion.css';
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

export default function ListPromotion() {
    const dispatch = useDispatch();
    const promotionsData = useSelector(state => state.promotions.promotions);
    
    useEffect(() => {
        dispatch(getPromotions());
    }, []);

    const classes = useStyles();
    return(
        <div class="container">
            <Header/>
            <div className="bread-scrumb">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <Typography color="textPrimary">List Promotions</Typography>
                </Breadcrumbs>
            </div>
            {promotionsData.map( row => 
            <div className="page-wrapper">
                <Card className={classes.root} key={row}>
                    <CardActionArea>
                        <Link to={{ pathname: '/promotions-detail', state: [row] }}/>
                            <CardMedia
                            className={classes.media}>
                                <img style={{height: 550,width: 800}} src={row.image!=null?'../images/'+row.image:''} alt="Admin"/>
                            </CardMedia>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {row.code}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {row.description}
                            </Typography>
                            </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" >
                                <Link to={{
                                    pathname: '/promotions-detail',
                                    state: [row]
                                }}> Read More </Link>
                        </Button>
                    </CardActions>
                </Card>
                </div>
            )}  
        </div>
    )}
