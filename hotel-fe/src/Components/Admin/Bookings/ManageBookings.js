import React, { useEffect,useState } from 'react';
import Header from '../Header';
import SlideBar from '../SlideBar';
import Content from './Content';

export default function ManageBookings() {

    return (
      <div className="container">
        <SlideBar/>
        <div className="page-container">
            <Header/>
            <Content/>
        </div>
      </div>
    );
  
}