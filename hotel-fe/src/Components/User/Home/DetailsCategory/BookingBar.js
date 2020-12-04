import React from 'react';

export default function BookingBar(){
    return(
        <div class="form-booking">
                    <h3>MAKE A REVERSATION</h3>
                    <div class="border-rv"></div>
                    <form>
                        <div class="form-booking-center">
                         
                            
                            <div class="form-booking-content">
                                
                                <div class="form-booking-tittle">
                                    <span> Check In Date:</span>
                                </div>
                                <div class="form-booking-datepicker">
                                    <input type="date"/>
                                </div>
                           </div>
                            
                            <div class="form-booking-content">
                                
                                <div class="form-booking-tittle">
                                    <span>Check OutDate:</span>
                                </div>
                                <div class="form-booking-datepicker">
                                    <input type="date" />
                                </div>
                           </div>
                            
                            <div class="form-booking-content">
                                <div class="form-booking-tittle">
                                    <span>Adults:</span>
                                </div>
                                <div class="select-this">
                                    
                                    <select name="select" id="select1">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                        
                                </div>
                           </div>
                            
                            <div class="form-booking-content">
                                <div class="form-booking-tittle">
                                    <span>Children:</span>
                                </div>
                                <div class="select-this">
                                    
                                    <select name="select" id="select1">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                        
                                </div>
                           </div>
                           <div class="form-booking-content">
                                <div class="form-booking-tittle">
                                    <span>Service:</span>
                                </div>
                                <div class="select-this">
                                    
                                    <select name="select" id="select1">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                        
                                </div>
                           </div>
                            
                            <div class="form-booking-content">
                                <button>Book Now </button>
                           </div>
                       

                        </div>
                    </form>
                </div>
        );
}