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
                                <div className="image">
                                    <img src="../images/a.jpg" alt="Admin" />
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </header>
        )
    
}