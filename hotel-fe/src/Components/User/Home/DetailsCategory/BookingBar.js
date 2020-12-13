
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getServices} from "../../../../Actions/serviceAction";
import TextField from "@material-ui/core/TextField";
import {history} from "../../../../Helper/history";
import {useLocation} from 'react-router-dom'
import './BoookingBar.css'

export default function BookingBar() {

  const servicesData = useSelector(state => state.services.services);
  const categoriesData = useLocation().state[0];
  const dispatch = useDispatch();
  const [itemErr, setItem] = useState({isErr: false, msgDate: '', msgPeople: ''})

  const [booking, setBooking] = useState({
    roomName: categoriesData.categoryName,
    checkIn: formatDate(new Date()),
    checkOut: formatDate(new Date()),
    numberOfPeople: 2,
    service: [],
    promotion: '',
    totalPrice: categoriesData.price,
    unitPrice: categoriesData.price
  })

  useEffect(() => {
    dispatch(getServices());
  }, [])

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
  }

  function handleChange(e) {
    setBooking({...booking, [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    setItem({...itemErr,isErr: false,msgDate: '', msgPeople: ''})
    if (booking.checkIn < formatDate(new Date())){
      setItem({...itemErr,isErr: true, msgDate: 'Check In cannot less then current Date'})
      return
    }
    if (booking.checkOut <= booking.checkIn) {
      setItem({...itemErr,isErr: true, msgDate: 'Check In must less then Check Out'})
      return
    }
    if (booking.numberOfPeople < 1) {
      setItem({...itemErr,isErr: true, msgDate: 'Number must greater then 1'})
      return
    }
    if (itemErr.isErr) {
      return;
    }
    let  dateIn = (new Date(booking.checkOut)- new Date(booking.checkIn))/ 86400000;
    booking.totalPrice += categoriesData.price*(dateIn-1);
    booking.unitPrice += categoriesData.price*(dateIn-1);
    const location = {
      pathname: '/booking-info',
      state: {booking}
    }
    history.push(location);
  }

  function formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  let indents = [];
  for (let i = 1; i < categoriesData.maximumPeopleOfRoom; i++) {
    indents.push(<option className='indent' key={i} value={i}>{i}</option>);
  }

  return (
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
              <TextField
                id="date"
                type="date"
                className="date"
                name={'checkIn'}
                required
                defaultValue={booking.checkIn}
                onChange={(e) => (handleChange(e))}
              />
              {itemErr.isErr ?( <span className={'txt-err'}> {itemErr.msgDate}</span>): '' }
            </div>
          </div>

          <div class="form-booking-content">

            <div class="form-booking-tittle">
              <span>Check OutDate:</span>
            </div>
            <div class="form-booking-datepicker">
              <TextField
                id="date"
                type="date"
                className="date"
                name={'checkOut'}
                defaultValue={booking.checkOut}
                onChange={(e) => (handleChange(e))}
                required/>
            </div>
            {itemErr.isErr ?( <span className={'txt-err'}> {itemErr.msgDate}</span>): '' }
          </div>

          <div class="form-booking-content">
            <div class="form-booking-tittle">
              <span>Max People:</span>
            </div>
            <div class="select-this">
              <select onChange={(e) => {
                handleChange(e)
              }} classNamePrefix="select"
                      className={'select-service basic-multi-select'} name={'numberOfPeople'}>
                {indents}
              </select>
            </div>
            {itemErr.isErr ?( <span className={'txt-err'}> {itemErr.msgPeople}</span>): '' }
          </div>

          <div class="form-booking-content">
            <div class="form-booking-tittle">
              <span>Service:</span>
            </div>
            <div class="select-this">

              <select onChange={(e) => {
                handleChangeSelect(e)
              }}
                      classNamePrefix="select"
                      className={'select-service basic-multi-select'} name={'services'} multiple>
                {servicesData && servicesData.length > 0 ?
                  servicesData.map((row, key) => (
                    <option key={key} value={row.serviceId}>{row.serviceName}</option>
                  ))
                  : ''
                }
              </select>

            </div>
          </div>

          <div class="form-booking-content">
            <button onClick={(e) => {handleSubmit(e)}}>Book Now</button>
          </div>


        </div>
      </form>
    </div>
  );
}


