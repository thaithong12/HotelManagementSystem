import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices, deleteServices, addOrUpdateServices } from '../../../Actions/serviceAction';
import Header from '../Header';
import SlideBar from '../SlideBar';

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



export default function ManageServices() {
    const dispatch = useDispatch();
    const servicesData = useSelector(state => state.services.services);
    
    const [data, setData] = useState();
    const [serviceId, setServiceId] = useState(0);
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [unitPrice, setUnitPrice] = useState(null);
    const [image, setImage] = useState('');
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
      dispatch(getServices());
      setData(servicesData);
    }, []);
    
    const onSubmit = (serviceId, serviceName, description, quantity, unitPrice, image) => {
        var item = {
        serviceId : serviceId,
        serviceName : serviceName, 
        description : description,
        quantity : quantity,
        unitPrice : unitPrice,
        image : image
        }
        
        var request = [item];
        if(serviceName==""){
          dispatch(getServices());
        }
        else{
          dispatch(addOrUpdateServices(request));
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
                
              <div className="big-content">SERVICES MANAGEMENT</div>
              
              <div className="add-icon-area">
              <IconButton fontSize={'medium'} onClick={() => {
                setModalIsOpen(true);
                setTitle("ADD FORM");
                setServiceId(0);
                setServiceName('');
                setDescription('');
                setQuantity(null);
                setUnitPrice(null);
                setImage('')}}>
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
                    <div className="modal-wrapper">
                        <div className="modal">
                            <div className="modal-header">
                              <button type="button" className="modal-close-button"   onClick={() =>setModalIsOpen(false)}>
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>

                            <h2>{title}</h2>
                            <div className="row">
                                <div className="label">
                                    <label>Service name</label>
                                </div>
                                <div className="content">
                                    <input type="text" defaultValue={serviceName} onChange={e =>setServiceName(e.target.value)} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="label">
                                    <label>Description</label>
                                </div>
                                <div className="content">
                                    <input type="text" defaultValue={description} onChange={e =>setDescription(e.target.value)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="label">
                                    <label>Quantity</label>
                                </div>
                                <div className="content">
                                    <input type="text" defaultValue={quantity} onChange={e =>setQuantity(e.target.value)} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="label">
                                    <label>Price</label>
                                </div>
                                <div className="content">
                                    <input type="text"  defaultValue={unitPrice} onChange={e =>setUnitPrice(e.target.value)} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="label">
                                    <label>Image</label>
                                </div>
                                <div className="content">
                                    <input type="file"  defaultValue={image} onChange={e =>setImage(e.target.value)} />
                                </div>
                            </div>

                            
                            <div class="row">
                                <input type="submit" value="Submit" onClick={()=>{setModalIsOpen(false);onSubmit(serviceId,serviceName,description,quantity,unitPrice,image)}} />
                            </div>
                        </div>
                    </div>
                </div>
              </Modal>
              
              
              <div>
              <Dialog open={open1} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure to delete this service?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose1} color="primary">
                      No
                    </Button>
                    <Button onClick={()=>{dispatch(deleteServices(temp));handleClose1()}} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead >
                  <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Quantity</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell>Image</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>        
                  {servicesData.map( (row, index) => (
                    <StyledTableRow key={index}>
                        <StyledTableCell align="left" component="th" scope="row">{index+1}</StyledTableCell>
                        <StyledTableCell align="left">{row.serviceName}</StyledTableCell>

                        <StyledTableCell align="left">{row.description}</StyledTableCell>
                        <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                        <StyledTableCell align="left">{row.unitPrice}</StyledTableCell>
                        <StyledTableCell align="left">{row.image}</StyledTableCell>
                        <StyledTableCell align="right" >
                          <Button variant="contained" color="primary" 
                          onClick={()=>{setModalIsOpen(true);
                          setServiceId(row.serviceId);
                          setServiceName(row.serviceName);
                          setDescription(row.description);
                          setQuantity(row.quantity);
                          setUnitPrice(row.unitPrice);
                          setUnitPrice(row.image);
                          setTitle("EDIT FORM")}}>EDIT</Button>
                          </StyledTableCell>
                        <StyledTableCell align="left" ><Button variant="contained" color="secondary" onClick={()=>{handleClickOpen1();setTemp(row)}}>DELETE</Button></StyledTableCell>
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
