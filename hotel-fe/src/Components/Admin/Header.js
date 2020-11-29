import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { useHistory } from "react-router-dom";
export default function Header() {
        
        let history = useHistory();
    
        function handleClick() {
            history.push("/");
        }
        return (
            <header className="header">
                <div className="header__content">
                    
                    <div className="header-wrap">
                        <form className="form-header">
                            <input className="input" type="text" name="search" placeholder="Search" />
                            <button className="btn-submit" type="submit">
                            
                            </button>
                        </form>
                            
                        <div className="account">
                            <div className="account-item">
                                <div className="image">
                                    <img src="../images/a.jpg" alt="Admin" />
                                </div>
                                <button type="button" onClick={handleClick}>
                                    Go home
                                </button>
                                <a href="#">Admin</a>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </header>
        )
    
}
