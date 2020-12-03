import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from "@material-ui/core";
import './../Rooms/Room.css'
import Paper from '@material-ui/core/Paper';
import {getAllOrders,deleteOrders} from "../../../Actions/userOrderAction";
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function Content() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.userOrders);
  const [idDelete,setId] = useState('');
  const [modalDelete , setModal] = useState(false);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [orders]);

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteOrders(idDelete));
    setId('');
    setModal(false);
  }
  return (
    <div className="main-content">
      <h2 className={'text-center'}>Manage Orders Page</h2>
      <div className={'table-content'}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell className={'text-center action'}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={'tbody'}>
              {(orders && orders.length > 0) ? orders.map((row, index) => (
                  <TableRow key={index} className={'row'} style={{height: '20px !important'}}>
                    <TableCell align="left" component="th" scope="row">{index + 1}</TableCell>
                    <TableCell align="left">{row.categoryRoom}</TableCell>
                    <TableCell align="left">{row.checkIn}</TableCell>
                    <TableCell align="left">{row.checkOut}</TableCell>
                    <TableCell align="left">{row.promotionCode && row.promotionCode.length > 0  ? row.promotionCode : 'Not Used'}</TableCell>
                    <TableCell align="left">{row.totalPrice}</TableCell>
                    <TableCell align="left"><span
                      className={row.status === 'PAID' ? 'status-suc' : 'status-err'}>{row.status}</span></TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="delete" onClick={() => {setId(row.id);setModal(true)}}>
                        <DeleteIcon fontSize="small"/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )) :
                (<tr className={'text-center'}>
                  <td colSpan={8}>Không có dữ liệu lúc này</td>
                </tr>)
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/*Modal Delete*/}
      <Dialog open={modalDelete} onClose={() => {
        setModal(false)
      }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this service?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setModal(false)
          }} color="primary">
            No
          </Button>
          <Button onClick={(e) => {
            handleDelete(e)
          }} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </div>)
}
