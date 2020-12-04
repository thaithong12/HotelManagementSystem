import SlideBar from "../SlideBar";
import React from "react";
import Header from "../Header";
import Content from "./Content";
export default function ManageOrders() {
  return (
    <div className="container">
      <SlideBar/>
      <div className="page-container">
        <Header/>
        <Content />
      </div>
    </div>
  );
}
