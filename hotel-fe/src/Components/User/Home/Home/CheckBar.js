import React from 'react';
export default function CheckBar(){
    return(
        <div class="check">
    		<form>
                <div class="check-center">
                 
                    
                    <div class="check-content">
                        
                        <div class="check-tittle">
                            <span> Check In Date:</span>
                        </div>
                        <div class="check-datepicker">
                            <input type="date"/>
                        </div>
                   </div>
                                        
                    <div class="check-content">
                        
                        <div class="check-tittle">
                            <span>Check OutDate:</span>
                        </div>
                        <div class="check-datepicker">
                            <input type="date" />
                        </div>
                   </div>
                    
                    <div class="check-content">
                        <div class="check-tittle">
                            <span>Adults:</span>
                        </div>
                        <div class="select-this">
                            <form action="#">
                                <div class="select-itms">
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
                    
                    <div class="check-content">
                        <div class="check-tittle">
                            <span>Children:</span>
                        </div>
                        <div class="select-this">
                            <form action="#">
                                <div class="select-itms">
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
                    
                    <div class="check-button">
                        <button>Check</button>
                   </div>
               

                </div>
            </form>
    	</div>
        );
}