import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import {Link} from "react-router-dom";
import { useDispatch, useSelector, } from 'react-redux';
import { getCategories } from '../../../../Actions/roomCategoryAction';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
export default function Categories(){
    const dispatch = useDispatch();
    const categoriesData = useSelector(state => state.categories.categories);
        
    useEffect(() => {
      dispatch(getCategories());
    }, []);
    return(
    <div className="container">
        <Header/>
        <div className="bread-scrumb">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <p>Categories</p>
                </Breadcrumbs>
            </div>
        <div className="list-room">
            
            <div className="  list-room-content  "   >
            {categoriesData.map( i => 
                <div className="room ">
                    <div className="img-container">
                        <img  src={i.images!=null?'../images/'+i.images[0].url:null} alt="Accomodation"/>
                        <Link className="btn-primary room-link" to={{
                                    pathname: '/details-category',
                                    state: [i]
                        }}> 
						See More 
						</Link>
                        
                    </div>
                    <p className="room-info">{i.categoryName}</p>
                </div>)}
                
                
            </div>
            
        </div> 
           
        <Footer/>
        
    </div>
    );
}
