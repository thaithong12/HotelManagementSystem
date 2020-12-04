import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllBookings, addBooking, deleteBooking} from "../../../Actions/bookingAction";
import {
    IconButton, Table,
    TableBody, TableContainer, TableHead, TableRow, TableCell, Button, Input
  } from "@material-ui/core";
import '../form.css';
import {StyledTableCell,StyledTableRow,useStyles} from '../css.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import './style.css';
import AddCircle from "@material-ui/icons/AddCircle";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import Paper from '@material-ui/core/Paper';

import './BookingInfo.css'


export default function Content() {
    const bookings = useSelector(state => state.bookings);
    const new_book = bookings && bookings.length > 0 ? bookings.filter(item => item.deleted === false ):[];
    console.log(new_book);
    const dispatch = useDispatch();
    const initItemExecute ={email: '', roomCode: '', country: '', promotionCode: '', gender: '', customerName: '', phoneNumber: '', address: '', checkIn: null, checkOut: null, totalPrice: 0, status: 'PAID', deleted: false };
    const [itemError, setItemErr] = useState({isErr: false})
    const [itemExecute, setItem] = useState(initItemExecute);
    const [modalAddOrUpdate, setModalAddOrUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [useCase, setCase] = useState('');
    useEffect(() => {
      dispatch(getAllBookings());
    }, []);
    const handleSubmit = (e) => {
      e.preventDefault();
      //clearMsg();
      if(useCase === 'ADD BOOKING') {
        //itemExecute.categoryId = categoryRoom.current.value;
        //itemExecute.roomNumber = roomNumber.current.value
      }
      if(useCase === 'UPDATE BOOKING') {
        // itemExecute.categoryId = categoryRoom.current.value;
        // itemExecute.roomNumber = roomNumber.current.value;
        // itemExecute.roomStatus = statusRoom.current.value;
      }
      let err = {};
      if (itemExecute.roomNumber === '') {
        err.isErr = true;
        
      }
      if (itemExecute.categoryId === '') {
        err.isErr = true;
   
      }
      setItemErr(err);
      if (err.isErr) return ;
      console.log(itemExecute)
      dispatch(addBooking(itemExecute));
      setModalAddOrUpdate(false);
      setItem(initItemExecute);
    }
    const handleChangeSelect = (e) => {
      let options = e.target.options;
      let value = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
    }
  
    function handleChange(e) {
      //console.log(e.target.name)
      //setCustomer({...customer,[e.target.name]: e.target.value})
    }
    const handleEdit = (id) => {
        const obj_book = bookings.filter(item => item.id === id)[0];
        setItem({email: obj_book.categoryId,
                 roomCode: obj_book.roomCode,
                 country: obj_book.country,
                 promotionCode: obj_book.promotionCode,
                 gender: obj_book.gender,
                 customerName: obj_book.customerName,
                 phoneNumber: obj_book.phoneNumber,
                 address: obj_book.address,
                 checkIn: obj_book.checkIn,
                 checkOut: obj_book.checkOut,
                 totalPrice: obj_book.totalPrice,
                 status: obj_book.status,
                 deleted: obj_book.deleted});
        console.log(itemExecute)
        setModalAddOrUpdate(true);
      }
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteBooking(itemExecute))
        setItem(initItemExecute);
        setModalDelete(false)
      }
    const classes = useStyles();
    return (
      <div className="table-content-booking">
        <h2 className={'text-center'}>Manage Bookings Page</h2>
        
          {/*Table*/}
          <IconButton fontSize={'medium'} onClick={() => {
            setCase('ADD ROOM');
            setModalAddOrUpdate(true);
            setItem(initItemExecute);
          }}>
            <AddCircle/>
          </IconButton>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Customer name</StyledTableCell>
                  <StyledTableCell>Phone number</StyledTableCell>
                  <StyledTableCell>Room number</StyledTableCell>
                  <StyledTableCell>Check-in date</StyledTableCell>
                  <StyledTableCell>Check-out date</StyledTableCell>
                  <StyledTableCell>Total price</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell className={'text-center action'}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={'tbody'}>
                {(new_book && new_book.length > 0) ? new_book.map((row, index) => (
                  <StyledTableRow key={index} className={'row'} style={{height: '20px !important'}}>
                    <StyledTableCell align="left" component="th" scope="row">{index + 1}</StyledTableCell>
                    <StyledTableCell align="left">{row.customerName}</StyledTableCell>
                    <StyledTableCell align="left">{row.phoneNumber}</StyledTableCell>
                    <StyledTableCell align="left">{row.roomCode}</StyledTableCell>
                    <StyledTableCell align="left">{row.checkIn === null ? row.checkIn : row.checkIn.substring(0, 10)}</StyledTableCell>
                    <StyledTableCell align="left">{row.checkOut === null ? row.checkOut : row.checkOut.substring(0, 10)}</StyledTableCell>
                    <StyledTableCell align="left">{row.totalPrice}</StyledTableCell>
                    <StyledTableCell align="left"><span className={row.status === 'PAID'? 'status-suc': 'status-err'}>{row.status}</span></StyledTableCell>
                    <StyledTableCell align="left">
                      <IconButton aria-label="delete" onClick={(e) => {handleEdit(row.id);setCase('UPDATE BOOKING')}}>
                        <EditIcon fontSize="small"/>
                      </IconButton>
                      <IconButton aria-label="delete" onClick={(e) => {setModalDelete(true); setItem({id: row.id})}}>
                        <DeleteIcon fontSize="small"/>
                      </IconButton> 
                    </StyledTableCell>
                  </StyledTableRow>
                )) : (<tr className={'text-center'}><td colSpan={9}>Data not found</td></tr>)}
              </TableBody> 
            </Table>
          </TableContainer> 
         {/*Modal Delete*/}
        <Dialog open={modalDelete} onClose={() => {setModalDelete(false)}} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure to delete this service?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {setModalDelete(false)}} color="primary">
                No
            </Button>
            <Button onClick={(e)=>{handleDelete(e)}} color="primary" autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
         {/*Modal Add or Update*/}
        <Modal isOpen={modalAddOrUpdate}
              onRequestClose={() => setModalAddOrUpdate(false)}
              className="form">
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
        </div>
        </Modal>

        </div>
    )
  
  }