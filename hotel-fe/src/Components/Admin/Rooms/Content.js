import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllRooms, addRoom, deleteRoom} from "../../../Actions/roomAction";
import {
  IconButton, Table,
  TableBody, TableContainer, TableHead, TableRow, TableCell, Button
} from "@material-ui/core";
import './Room.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from "@material-ui/icons/AddCircle";
import Select from "@material-ui/core/Select";
import Paper from '@material-ui/core/Paper';
import Modal from 'react-modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {BLANK_MSG} from "../../../Constans/messageConstant";
import {getCategories} from "../../../Actions/roomCategoryAction";

export default function Content() {
  const rooms = useSelector(state => state.rooms);
  const categoriesRooms = useSelector(state => state.categories.categories)
  const dispatch = useDispatch();
  const initItemExecute ={roomId: '',roomNumber: '',categoryId: '',roomStatus: 'AVAILABLE' };
  const [itemExecute, setItem] = useState(initItemExecute);
  const [itemError, setItemErr] = useState({isErr: false ,msgRoom: '', msgCate: ''})
  const [modalAddOrUpdate, setModalAddOrUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [useCase, setCase] = useState('');
  const roomNumber = useRef();
  const categoryRoom = useRef();
  const statusRoom = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearMsg();
    if(useCase === 'ADD ROOM') {
      itemExecute.categoryId = categoryRoom.current.value;
      itemExecute.roomNumber = roomNumber.current.value
    }
    if(useCase === 'UPDATE ROOM') {
      itemExecute.categoryId = categoryRoom.current.value;
      itemExecute.roomNumber = roomNumber.current.value;
      itemExecute.roomStatus = statusRoom.current.value;
    }
    let err = {};
    if (itemExecute.roomNumber === '') {
      err.isErr = true;
      err.msgRoom = BLANK_MSG
    }
    if (itemExecute.categoryId === '') {
      err.isErr = true;
      err.msgCate = BLANK_MSG
    }
    setItemErr(err);
    if (err.isErr) return ;
    console.log(itemExecute)
    dispatch(addRoom(itemExecute));
    setModalAddOrUpdate(false);
    setItem(initItemExecute);
  }
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteRoom(itemExecute))
    setItem(initItemExecute);
    setModalDelete(false)
  }

  const handleEdit = (id) => {
    const obj = rooms.filter(item => item.roomId === id)[0];
    setItem({categoryId: obj.categoryId, roomId: obj.roomId,
      roomStatus: obj.roomStatus, roomNumber: obj.roomNumber});
    console.log(itemExecute)
    setModalAddOrUpdate(true);
  }

  const clearMsg = () => {
    setItemErr({
      isErr: false,
      msgCate: '',
      msgRoom: ''
    })
  }

  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(getCategories())
  }, []);
  return (
    <div className="main-content">
      <h2 className={'text-center'}>Manage Rooms Page</h2>
      <div className={'table-content'}>
        {/*Table*/}
        <IconButton fontSize={'medium'} onClick={() => {
          setCase('ADD ROOM');
          setModalAddOrUpdate(true);
          setItem(initItemExecute);
        }}>
          <AddCircle/>
        </IconButton>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Room Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell className={'text-center action'}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={'tbody'}>
              {(rooms && rooms.length > 0) ? rooms.map((row, index) => (
                <TableRow key={index} className={'row'} style={{height: '20px !important'}}>
                  <TableCell align="left" component="th" scope="row">{index + 1}</TableCell>
                  <TableCell align="left">{row.roomNumber}</TableCell>
                  <TableCell align="left">{row.categoryName}</TableCell>
                  <TableCell align="left"><span className={row.roomStatus === 'AVAILABLE'? 'status-suc': 'status-err'}>{row.roomStatus}</span></TableCell>
                  <TableCell align="left">
                    <IconButton aria-label="delete" onClick={(e) => {handleEdit(row.roomId);setCase('UPDATE ROOM')}}>
                      <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={(e) => {setModalDelete(true); setItem({roomId: row.roomId})}}>
                      <DeleteIcon fontSize="small"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : (<tr className={'text-center'}><td colSpan={5}>Không có dữ liệu lúc này</td></tr>)}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/*Modal Add or Update*/}
      <Modal isOpen={modalAddOrUpdate}
             onRequestClose={() => setModalAddOrUpdate(false)}
             className="form">
        <div>
          <div className="modal-overlay"/>
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <button type="button" className="modal-close-button" onClick={() => setModalAddOrUpdate(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <h2>{useCase}</h2>
              <div className="row">
                <div className="label">
                  <label>Room Number</label>
                </div>
                <div className="content">
                  <input type="text" ref={roomNumber} defaultValue={itemExecute.roomNumber}/>
                </div>
                <div className={'text-err'}>{itemError.isErr  ? itemError.msgRoom: ''}</div>
              </div>
              <div className="row">
                <div className="label">
                  <label>Category Room</label>
                </div>
                <Select className={'content'}
                        native inputRef={categoryRoom}
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                >
                  {(categoriesRooms && categoriesRooms.length > 0) ?
                    categoriesRooms.map((row , index) => (
                    <option value={row.categoryId} selected={itemExecute.categoryId === row.categoryName}>{row.categoryName}</option>
                    )): <option aria-label="None" value=""/>}
                </Select>
                <div className={'text-err'}>{itemError.isErr ? itemError.msgCate : ''}</div>
              </div>
              {useCase === 'UPDATE ROOM' ? <div className="row">
                <div className="label">
                  <label>Status Room</label>
                </div>
                <Select className={'content'}
                        native inputRef={statusRoom}
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                >
                  <option aria-label="None" value=""/>
                  <option value={'AVAILABLE'} selected={itemExecute.roomStatus === 'AVAILABLE'}>AVAILABLE</option>
                  <option value={'BOOKED'} selected={itemExecute.roomStatus === 'BOOKED'}>BOOKED</option>
                </Select>
              </div> : ''}
              <div class="row">
                <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)}/>
              </div>
            </div>
          </div>
        </div>
      </Modal>

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