import Header from "../Header";
import React, {useState} from "react";
import './BookingInfo.css'
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';

export default function BookingInfo() {
  const [customer ,setCustomer] = useState({
    fname: '',
    lname: '',
    gender: 'MALE',
    country: '',
    email: '',
    phone: '',
    services: [],
    promotion: '',
    special: '',
    method: ''
  });

  const handleChangeSelect = (e) => {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setCustomer({...customer,services: value})
  }

  function handleChange(e) {
    console.log(e.target.name)
    setCustomer({...customer,[e.target.name]: e.target.value})
  }

  console.log(customer);

  return (
    <div className="container">
      <Header/>
      <div className={'booking-info'}>
        <div className={'customer-info'}>
          <div className={'title-content'}>
            <h2>Customer Information</h2>
          </div>
          <br/>
          <br/>
          <form action={'#'}>
            <div>
              <div className={'customer-name'}>
                <select>
                  <option>Mr</option>
                  <option>Ms</option>
                </select>
                <Input id="fname" name={'fname'} className={'my-input'} placeholder={'First Name'}
                       onChange={(e) => handleChange(e)}/>
                <Input id="lname" name={'lname'} className={'my-input'} placeholder={'Last Name'}
                onChange={(e) => handleChange(e)}/>
              </div>
              <br/>
              <p><strong>Country/Region</strong></p>
              <select name={'country'} className={'my-select'}
                      onChange={(e) => handleChange(e)}>
                <option value={'VN'}>VN</option>
                <option value={'US'}>US</option>
              </select>
              <br/>
              <br/>
              <div className={'email-phone'}>
                <div>
                  <p><strong>Email</strong></p>
                  <Input name={'email'} onChange={(e) => {
                    handleChange(e)
                  }} id="email" className={'my-input'} placeholder={'Email Address'}/>
                </div>
                <div style={{paddingLeft: 32}}>
                  <p><strong>Phone Number</strong></p>
                  <Input name={'phone'}
                         id="phone" className={'my-input'}
                         placeholder={'Phone Number'}
                         onChange={(e) => {
                           handleChange(e)}}
                  />
                </div>
              </div>
              <br/>
              <br/>
              <div className={'email-phone'}>
                <div>
                  <p><strong>Services</strong></p>
                  <select onChange={(e) => {handleChangeSelect(e)}}
                          className={'services'} name={'services'} multiple>
                    <option value={'abc'}>VN</option>
                    <option value={'def'}>US</option>
                  </select>
                </div>
                <div style={{paddingLeft: 32}}>
                  <p><strong>Promotion Code</strong></p>
                  <Input id="code" className={'my-input'} placeholder={'Promotion Code'}/>
                </div>
              </div>
              <br/>
              <br/>
              <p><strong>Special Requirement</strong></p>
              <textarea placeholder={'Special Requirement'} cols={68} rows={5}></textarea>
              <br/>
              <br/>
              <p><strong>Payment Method</strong></p>
              <div className={'border'} style={{display: "flex", flexDirection: "row"}}>
                <div>
                  <input checked={false} className={'my-input-2'} type={'radio'} id="full" name="full" value="full"/>
                  <label htmlFor="full">Full</label><br/>
                </div>
                <div style={{paddingLeft: 300}}>
                  <input checked={true} className={'my-input-2'} type={'radio'} id="deposit" name="deposit" value="deposit"/>
                  <label htmlFor="deposit">Deposit</label><br/>
                </div>
              </div>
              <br/>
              <br/>
              <Button variant="contained" color="secondary" type={'submit'}>
                Secondary
              </Button>
            </div>
          </form>
        </div>

        <div className={'booking'}>
          <h3>Booking Details</h3>
          <hr/>
          <ul>
            <li>Room Name :</li>
            <li>Check In :</li>
            <li>Check Out :</li>
            <li>Number Of People :</li>
            <li>Services:</li>
            <li>Promotion Code:</li>
          </ul>
          <hr/>
          <br/>
          <p> Total Price : </p>
        </div>

      </div>
    </div>
  );
}
