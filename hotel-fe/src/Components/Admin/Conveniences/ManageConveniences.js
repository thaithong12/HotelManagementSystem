import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConveniences, deleteConveniences, addOrUpdateConveniences } from '../../../Actions/convenienceAction';
import Header from '../Header';
import SlideBar from '../SlideBar';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import {StyledTableCell,StyledTableRow,useStyles} from '../css.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import '../form.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Modal from 'react-modal';



export default function ManageConveniences() {
    const dispatch = useDispatch();
    const conveniencesData = useSelector(state => state.conveniences.conveniences);
    
    const [convenientId, setConvenientId] = useState(0);
    const [convenientName, setConvenientName] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const [temp, setTemp] = useState();
    const [title, setTitle] = useState();
    
    const handleClickOpen1 = () => {
      setOpen1(true);
    };

    const handleClose1 = () => {
      setOpen1(false);
    };

    useEffect(() => {
      dispatch(getConveniences());
    }, []);
    
    const onSubmit = (convenientId, convenientName) => {
        var item = {
        convenientId : convenientId,
        convenientName : convenientName
        }
        var request = [item];
        if(convenientName===""){
          dispatch(getConveniences());
        }
        else{
          dispatch(addOrUpdateConveniences(request));
        }
    }

    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return(
      <div className="container">
          <SlideBar/>
          <div className="page-container">
              <Header/>
              <div className="form-container">
                
              
              <h2>CONVENIENCES MANAGEMENT</h2>
              <div className="add-icon-area">
              <IconButton fontSize={'medium'} onClick={() => {
                setModalIsOpen(true);
                setTitle("ADD FORM");
                setConvenientId(0);
                setConvenientName('')}}>
                <AddCircle/>
              </IconButton>
              </div>

              <div>
              <Modal isOpen={modalIsOpen}
              shouldCloseOnOverlayClick={false}
              onRequestClose={() => setModalIsOpen(false)}
              className="form">
              <div>
                <div className="modal-overlay"/>
                    <div className="modal-wrapperr">
                        <div className="modal">
                            <div className="modal-header">
                              <button type="button" className="modal-close-button"   onClick={() =>setModalIsOpen(false)}>
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>

                            <h2>{title}</h2>
                            <div className="row">
                                <div className="label">
                                    <label>Convenience name</label>
                                </div>
                                <div className="content">
                                    <input type="text" defaultValue={convenientName} onChange={e =>setConvenientName(e.target.value)} />
                                </div>
                            </div>
                            
                            <div class="row">
                                <input type="submit" value="Submit" onClick={()=>{setModalIsOpen(false);onSubmit(convenientId,convenientName)}} />
                            </div>
                        </div>
                    </div>
                </div>
              </Modal>
              
              
              <div>
              <Dialog open={open1} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure to delete this convenience?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose1} color="primary">
                      No
                    </Button>
                    <Button onClick={()=>{dispatch(deleteConveniences(temp));handleClose1()}} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>        
                  {conveniencesData.map( (row, index) => (
                    <StyledTableRow key={index+1}>
                        <StyledTableCell align="left" component="th" scope="row">{index}</StyledTableCell>
                        <StyledTableCell align="left">{row.convenientName}</StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton aria-label="edit" onClick={()=>{setModalIsOpen(true);
                            setConvenientId(row.convenientId);
                            setConvenientName(row.convenientName);
                            setTitle("EDIT FORM")}}>
                            <EditIcon fontSize="small"/>
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton aria-label="delete" onClick={()=>{handleClickOpen1();setTemp(row)}}>
                            <DeleteIcon fontSize="small"/>
                          </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            </div>
          </div>
        </div>
        </div>
      )}
