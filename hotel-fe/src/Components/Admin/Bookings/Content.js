import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllBookings, deleteBooking} from "../../../Actions/bookingAction";
import {
    IconButton, Table,
    TableBody, TableContainer, TableHead, TableRow, TableCell, Button
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

import Paper from '@material-ui/core/Paper';

export default function Content() {
    const bookings = useSelector(state => state.bookings);
    const new_book = bookings && bookings.length > 0 ? bookings.filter(item => item.deleted === false ):[];
    console.log(new_book);
    const dispatch = useDispatch();
    const initItemExecute ={email: '', roomCode: '', country: '', promotionCode: '', gender: '', customerName: '', phoneNumber: '', address: '', checkIn: null, checkOut: null, totalPrice: 0, status: 'UNPAID', deleted: false };
    const [itemError, setItemErr] = useState({isErr: false ,msgRoom: '', msgCate: ''})
    const [itemExecute, setItem] = useState(initItemExecute);
    const [modalAddOrUpdate, setModalAddOrUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [useCase, setCase] = useState('');
    useEffect(() => {
      dispatch(getAllBookings());
    }, []);
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
                      <IconButton aria-label="delete">
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

      </div>
    )
  
  }