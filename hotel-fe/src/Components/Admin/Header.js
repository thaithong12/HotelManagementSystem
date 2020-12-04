import React from 'react';

export default function Header() {
    
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
                                <div className="account-image">
                                    <img src="../images/a1.jpg" alt="Admin" />
                                </div>
                                <div className="account-content">
                                    <a href="#">Admin</a>
                                </div>
                                <div className="account-dropdown">

                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </header>
        )
    
}