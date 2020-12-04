import React from 'react';
import Header from '../Header';
import CheckBar from './CheckBar';
import Banner from './Banner';

import Footer from '../Footer';

import About from './About';
import Accomodation from './Accomodation';
import ServiceHome from './ServiceHome';
export default function Home(){

    return(
        <div className="container">
            <Header/>
            <Banner/>
            <CheckBar/>
            <About/>
            <Accomodation/>
            <ServiceHome/>
            <Footer/>
        </div>
        );
}

