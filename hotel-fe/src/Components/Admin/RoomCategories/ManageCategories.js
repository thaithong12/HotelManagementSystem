import React, { Component } from 'react';
import Header from '../Header';
import Content from './Content';
import SlideBar from '../SlideBar';


export default function ManageCategories() {

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