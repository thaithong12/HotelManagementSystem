import Header from "../Header";
import React, {useEffect, useState} from "react";
import './BookingInfo.css'
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from "react-redux";
import {getServices} from "../../../../Actions/serviceAction";
import {getPromotions} from "../../../../Actions/promotionActions";
import {useLocation} from 'react-router-dom'
import {history} from "../../../../Helper/history";

export default function BookingInfo() {
  const servicesData = useSelector(state => state.services.services);
  const dispatch = useDispatch();
  const data = useLocation().state.booking;
  const promotionsData = useSelector(state => state.promotions.promotions);
  const [itemErr, setItem] = useState({isErr: false, msg: ''});

  const [booking, setBooking] = useState({
    roomName: data.roomName,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    numberOfPeople: data.numberOfPeople,
    service: data.service && data.service.length > 0 ? data.service : [],
    promotion: data.promotion ? data.promotion : '',
    totalPrice: data.totalPrice,
    unitPrice: data.unitPrice
  });

  useEffect(() => {
    dispatch(getServices());
    dispatch(getPromotions());
  }, []);

  const [customer, setCustomer] = useState({
    fname: '',
    lname: '',
    gender: 'MALE',
    country: '',
    email: '',
    phone: '',
    services: [],
    promotion: '',
    special: '',
    method: 'full'
  });

  const handleChangeSelect = (e) => {
    let options = e.target.options;
    let value = [];
    let name = [];
    let price = 0;
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
        name.push(options[i].text);
        const item = servicesData.filter(item => options[i].text === item.serviceName);
        price += item[0].unitPrice;
      }
    }
    setBooking({...booking, service: [...name], totalPrice: (booking.unitPrice + price)})
    setCustomer({...customer, services: value})
  }

   function handleSubmit(e) {
    e.preventDefault();
    let check = false;
    setItem({...itemErr, isErr: false, msg: ''});
    if (customer.method === '' || customer.email === ''
       || customer.fname === '' || customer.lname === '' || customer.country === '' || customer.phone === ''){
      setItem({...itemErr, isErr: true, msg: 'This Fields Cannot be Blank'})
      check = true;
    }
    if (itemErr.isErr === true || check) return;
    const location = {
      pathname: '/payment',
      state: {
        customer: {...customer},
        booking: {...booking},
      }
    }
    console.log(location)
    history.push(location);
  }

  function handleChange(e) {
    setCustomer({...customer, [e.target.name]: e.target.value})
    if (e.target.name === 'promotion') {
      setBooking({...booking, promotion: e.target.value})
      }
  }

  return (
    <div className="container">
      <Header/>
      <div className={'booking-info'}>
        <div className={'customer-info'}>
          <div className={'title-content'}>
            <h2>Customer Information</h2>
            {itemErr.isErr ? <p className={'txt-err txt-center'}>{itemErr.msg}</p> : ''}
            <p></p>
          </div>
          <br/>
          <br/>
          <form action={'#'}>
            <div>
              <div className={'customer-name'}>
                <select onChange={(e) => handleChange(e)} name={'gender'}>
                  <option value={'MALE'}>Mr</option>
                  <option value={'FEMALE'}>Ms</option>
                </select>
                <Input id="fname" name={'fname'} className={'my-input'} placeholder={'First Name'}
                       onChange={(e) => handleChange(e)} required/>
                <Input id="lname" name={'lname'} className={'my-input'} placeholder={'Last Name'}
                       onChange={(e) => handleChange(e)} required/>
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
                  }} defaultValue={customer.email} id="email" className={'my-input'} placeholder={'Email Address'} required/>
                </div>
                <div style={{paddingLeft: 32}}>
                  <p><strong>Phone Number</strong></p>
                  <Input name={'phone'}
                         id="phone" className={'my-input'}
                         placeholder={'Phone Number'}
                         onChange={(e) => {
                           handleChange(e)
                         }} required
                         defaultValue={customer.phone}
                  />
                </div>
              </div>
              <br/>
              <br/>
              <div className={'email-phone'}>
                <div>
                  <p><strong>Services</strong></p>
                  <select onChange={(e) => {
                    handleChangeSelect(e)
                  }}
                          classNamePrefix="select"
                          className={'select-service basic-multi-select'} name={'services'} multiple>
                    {servicesData && servicesData.length > 0 ?
                      servicesData.map((row, key) => (
                        <option key={key} value={row.serviceId}>{row.serviceName}</option>
                      ))
                      : ''}
                  </select>
                </div>
                <div style={{paddingLeft: 32}}>
                  <p><strong>Promotion Code</strong></p>
                  <Input onChange={(e) => {
                    handleChange(e)
                  }}
                         name={'promotion'}
                         id="code" className={'my-input'}
                         placeholder={'Promotion Code'}/>
                </div>
              </div>
              <br/>
              <br/>
              <p><strong>Special Requirement</strong></p>
              <textarea onChange={(e) => {
                handleChange(e)
              }}
                        placeholder={'Special Requirement'} cols={68} rows={5} name={'special'}></textarea>
              <br/>
              <br/>
              <p><strong>Payment Method</strong></p>
              <div className={'border'} style={{display: "flex", flexDirection: "row"}}>
                <div>
                  <input checked={customer.method === 'full'}
                         className={'my-input-2'}
                         type={'radio'} id="full"
                         name="method"
                         value="full"
                         onClick={(e) => {
                           handleChange(e)
                         }}/>
                  <label htmlFor="full">Full</label><br/>
                </div>
                <div style={{paddingLeft: 300}}>
                  <input checked={customer.method === 'deposit'}
                         className={'my-input-2'}
                         type={'radio'}
                         id="deposit"
                         name="method"
                         onClick={(e) => {
                           handleChange(e)
                         }}
                         value="deposit"/>
                  <label htmlFor="deposit">Deposit</label><br/>
                </div>
              </div>
              <br/>
              <br/>
              <Button onClick={(e) => handleSubmit(e)} className={'my-button'} variant="contained" color="secondary"
                      type={'submit'}>
                Secondary
              </Button>
            </div>
          </form>
        </div>

        <div className={'booking'}>
          <h3>Booking Details</h3>
          <hr/>
          <ul>
            <li>Room Name :{booking.roomName}</li>
            <li>Check In :{booking.checkIn}</li>
            <li>Check Out :{booking.checkOut}</li>
            <li>Number Of People : {booking.numberOfPeople}</li>
            <li>Services: {booking.service.length > 0 ? booking.service.map((val, index) => (
              <span style={{color: "green"}}>{val} </span>
            )) : ''}</li>
            <li>Promotion Code:
              {promotionsData && promotionsData.filter(item => item.code === customer.promotion) &&
              promotionsData.filter(item => item.code === customer.promotion).length > 0 ?
                (<span className={'valid-code'}>abc</span>) : (<span className={'unvalid-code'}>def</span>)}
            </li>
          </ul>
          <hr/>
          <br/>
          <p> Total Price : {promotionsData
          && promotionsData.filter(item => item.code === customer.promotion) &&
          promotionsData.filter(item => item.code === customer.promotion).length > 0 ?
            (<span>
              {booking.totalPrice - booking.totalPrice * promotionsData.filter(item => item.code === customer.promotion)[0].discount / 100}
              <del> {booking.totalPrice}</del>
            </span>) : <span>{booking.totalPrice}</span>}
          </p>
        </div>

      </div>
    </div>
  );
}
