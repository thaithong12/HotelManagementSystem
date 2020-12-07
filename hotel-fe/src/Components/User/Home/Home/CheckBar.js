import React from 'react';
export default function CheckBar(){

    return(
        <div className="check">
    		<form>
                <div className="check-center">
                 
                    
                    <div className="check-content">
                        
                        <div className="check-tittle">
                            <span> Check In Date:</span>
                        </div>
                        <div className="check-datepicker">
                            <input type="date"/>
                        </div>
                   </div>
                                        
                    <div className="check-content">
                        
                        <div className="check-tittle">
                            <span>Check OutDate:</span>
                        </div>
                        <div className="check-datepicker">
                            <input type="date" />
                        </div>
                   </div>
                    
                    <div className="check-content">
                        <div className="check-tittle">
                            <span>Adults:</span>
                        </div>
                        <div className="select-this">
                            <form action="#">
                                <div className="select-itms">
                                    <select name="select" id="select1">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                   </div>
                    
                    <div className="check-content">
                        <div className="check-tittle">
                            <span>Children:</span>
                        </div>
                        <div className="select-this">
                            <form action="#">
                                <div className="select-itms">
                                    <select name="select" id="select2">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                   </div>
                    
                    <div className="check-button">
                        <button>Check</button>
                   </div>
               

                </div>
            </form>
    	</div>
        );
}

