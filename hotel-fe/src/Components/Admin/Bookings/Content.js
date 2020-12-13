import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllBookings, addBooking, deleteBooking} from "../../../Actions/bookingAction";
import {
    IconButton, Table,
    TableBody, TableContainer, TableHead, TableRow, TableCell, Button, Input
  } from "@material-ui/core";

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
import TextField from '@material-ui/core/TextField';

import './BookingAdmin.css'


export default function Content() {
    const bookings = useSelector(state => state.bookings);
    const new_book = bookings && bookings.length > 0 ? bookings.filter(item => item.deleted === false ):[];
    console.log(new_book);
    const dispatch = useDispatch();
    const initItemExecute = {
      id: 0,
      address: '',
      country: '',
      customerName: '',
      email: '',
      gender: '',
      phoneNumber: '',
      checkIn: null,
      checkOut: null,
      status: 'UNPAID',
      totalPrice: 0,
      prePayment: 0,
      promotionCode: '',
      roomCode: '', 
      deleted: false };
    const [itemErr, setItemErr] = useState({isErr: false, msg: ''})
    const [itemExecute, setItem] = useState(initItemExecute);
    const [modalAddOrUpdate, setModalAddOrUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [useCase, setCase] = useState('');
    useEffect(() => {
      dispatch(getAllBookings());
    }, []);
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(useCase);
      let err = {};
      if(itemExecute.status === '') err.isErr = true;
      if(itemExecute.checkIn === null) err.isErr = true;
      if(itemExecute.checkOut === null) err.isErr = true;
      if(itemExecute.checkOut < itemExecute.checkIn) err.isErr = true;
      if(itemExecute.country ==='') err.isErr = true;
      if(itemExecute.customerName === '') err.isErr = true;
      if(itemExecute.email === '') err.isErr = true;
      if(itemExecute.phoneNumber === '') err.isErr = true;
      setItemErr(err);
      console.log(err.isErr)
      console.log(itemExecute)
      if (err.isErr) return;
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
      console.log(e.target.name);
      setItem({...itemExecute, [e.target.name]: e.target.value});
      
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
            setCase('ADD BOOKING');
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
           
          <div className="modal-overlay-booking"/>
          <div className="modal-wrapper-booking">
            <div className="modal-booking">
              <div className="modal-header">
                <button type="button" className="modal-close-button" onClick={() => setModalAddOrUpdate(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <h2>{useCase}</h2>
              <div className={'booking-info'}>
                <div className={'customer-info-admin'}>
                <form action={'#'}>
                  <div>
                    <div className={'customer-name'}>
                      <select onChange={(e) => handleChange(e)} name={'gender'}>
                        <option value={'MALE'}>Mr</option>
                        <option value={'FEMALE'}>Ms</option>
                      </select>
                      <Input id="customerName" name={'customerName'} className={'my-input'} placeholder={'Full name'} defaultValue={itemExecute.customerName}
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
                         <Input name={'email'} defaultValue={itemExecute.email} onChange={(e) => {
                          handleChange(e)
                        }} id="email" className={'my-input'} placeholder={'Email Address'} required/> 
                      </div>
                      <div style={{paddingLeft: 32}}>
                        <p><strong>Phone Number</strong></p>
                        <Input name={'phoneNumber'}
                              id="phoneNumber" className={'my-input'}
                              placeholder={'Phone Number'}
                              onChange={(e) => {
                                handleChange(e)
                              }} required
                              defaultValue={itemExecute.phoneNumber}
                        />
                      </div>
                    </div>
                    <br/>
                    <div className={'email-phone'}>
                       <div>
                          <p><strong>Form</strong></p>
                          <TextField
                          id="date"
                          type="date"
                          className = "date"
                          name={'checkIn'}                
                          //defaultValue={itemExecute.checkIn === null ? itemExecute.checkIn : itemExecute.checkIn.substring(0,10)}
                          onChange={e => handleChange(e)}
                          />
                       </div>
                       
                       <div style={{paddingLeft: 90}}>
                          <p><strong>To</strong></p>
                          <TextField
                                    id="date"
                                    type="date"
                                    min={(itemExecute.checkIn)}
                                    className = "date"
                                    name={'checkOut'}
                                    //defaultValue={itemExecute.checkOut === null ? itemExecute.checkOut : itemExecute.checkOut.substring(0,10)}
                                    onChange={e => handleChange(e)}
                                  />
                      </div>                          
                    </div>
                    <br/>
                    <div className={'email-phone'}>
                      <div>
                        <p><strong>Promotion Code</strong></p>
                        <Input defaultValue = {itemExecute.promotionCode} onChange={(e) => {
                          handleChange(e)
                        }}
                              name={'promotionCode'}
                              id="code" className={'my-input'}
                              placeholder={'Promotion Code'}/>
                      </div>
                    </div>
                    <br/>
                    <br/>
                    {/* <p><strong>Special Requirement</strong></p>
                    <textarea onChange={(e) => {
                      handleChange(e)
                    }}
                              placeholder={'Special Requirement'} cols={68} rows={5} name={'special'}></textarea>
                    <br/>
                    <br/> */}
                    <p><strong>Payment Method</strong></p>
                    <div className={'border'} style={{display: "flex", flexDirection: "row"}}>
                      <div>
                        <input checked={itemExecute.status === 'PAID'}
                              className={'my-input-2'}
                              type={'radio'} id="full"
                              name={'status'}
                              value="PAID"
                              onClick={(e) => {
                                handleChange(e)
                              }}/>
                        <label htmlFor="full">Full</label><br/>
                      </div>
                      <div style={{paddingLeft: 300}}>
                        <input checked={itemExecute.status === 'DEPOSIT'}
                              className={'my-input-2'}
                              type={'radio'}
                              id="deposit"
                              name={'status'}
                              onClick={(e) => {
                                handleChange(e)
                              }}
                              value="DEPOSIT"/>
                        <label htmlFor="deposit">Deposit</label><br/>
                      </div>
                    </div>
                    <br/>
                    <br/>
                  </div>
                </form>
              </div>
              <div class="row">
                <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)}/>
              </div>
             </div>
             
           </div>                
       </div>
    
        
        </Modal>

        </div>
    )
  
  }