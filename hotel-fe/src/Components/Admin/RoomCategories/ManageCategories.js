import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategories, addOrUpdateCategories } from '../../../Actions/roomCategoryAction';
import Header from '../Header';
import SlideBar from '../SlideBar';

import {StyledTableCell,StyledTableRow,useStyles} from '../css.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';

import '../form.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Modal from 'react-modal';



export default function ManageCategories() {
    const dispatch = useDispatch();
    const categoriesData = useSelector(state => state.categories.categories);
    
    const [data, setData] = useState();
    const [categoryId, setCategoryId] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [numberOfRoom, setNumberOfRoom] = useState(null);
    const [maximumPeopleOfRoom, setMaximumPeopleOfRoom] = useState(null);
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

    React.useEffect(() => {
      const node = loadCSS(
        'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      );
  
      return () => {
        node.parentNode.removeChild(node);
      };
    }, []);

    useEffect(() => {
      dispatch(getCategories());
      setData(categoriesData);
    }, []);
    
    const onSubmit = (categoryId, categoryName, description, price, numberOfRoom, maximumPeopleOfRoom, image) => {
        var item = {
          categoryId : categoryId,
          categoryName : categoryName, 
          description : description,
          price : price,
          numberOfRoom : numberOfRoom,
          maximumPeopleOfRoom : maximumPeopleOfRoom,
          image : image
        }
        
        var request = [item];
        if(categoryName==""){
          dispatch(getCategories());
        }
        else{
          dispatch(addOrUpdateCategories(request));
        }
    }

    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return(
      <div className="container">
          <SlideBar/>
          <div className="page-container">
              <Header/>
              <div className="main-content">
                
              <div className="big-content">ROOM CATEGORIES MANAGEMENT</div>

              <div className="add-icon-area">
                <Icon className="fa fa-plus-circle" color="primary" style={{ fontSize: 35 }} 
                onClick={() => {
                  setModalIsOpen(true);
                  setTitle("ADD FORM");
                  setCategoryId(0);
                  setCategoryName('');
                  setDescription('');
                  setPrice(null);
                  setNumberOfRoom(null);
                  setMaximumPeopleOfRoom(null);
                  setImage('')}}/>
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
                                    <label>Category name</label>
                                </div>
                                <div className="content">
                                    <input type="text" defaultValue={categoryName} onChange={e =>setCategoryName(e.target.value)} />
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
                                    <label>Price</label>
                                </div>
                                <div className="content">
                                    <input type="text" defaultValue={price} onChange={e =>setPrice(e.target.value)} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="label">
                                    <label>Number Of Room</label>
                                </div>
                                <div className="content">
                                    <input type="text"  defaultValue={numberOfRoom} onChange={e =>setNumberOfRoom(e.target.value)} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="label">
                                    <label>Maximum People Of Room</label>
                                </div>
                                <div className="content">
                                    <input type="text"  defaultValue={maximumPeopleOfRoom} onChange={e =>setMaximumPeopleOfRoom(e.target.value)} />
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
                                <input type="submit" value="Submit" onClick={()=>{setModalIsOpen(false);onSubmit(categoryId,categoryName,description,price,numberOfRoom,maximumPeopleOfRoom,image)}} />
                            </div>
                        </div>
                    </div>
                </div>
              </Modal>
              
              
              <div>
              <Dialog open={open1} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure to delete this room category?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose1} color="primary">
                      No
                    </Button>
                    <Button onClick={()=>{dispatch(deleteCategories(temp));handleClose1()}} color="primary" autoFocus>
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
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell>Number of room</StyledTableCell>
                      <StyledTableCell>Maximum number of room</StyledTableCell>
                      <StyledTableCell>Image</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>        
                  {categoriesData.map( (row, index) => (
                    <StyledTableRow key={index}>
                        <StyledTableCell align="left" component="th" scope="row">{index+1}</StyledTableCell>
                        <StyledTableCell align="left">{row.categoryName}</StyledTableCell>

                        <StyledTableCell align="left">{row.description}</StyledTableCell>
                        <StyledTableCell align="left">{row.price}</StyledTableCell>
                        <StyledTableCell align="left">{row.numberOfRoom}</StyledTableCell>
                        <StyledTableCell align="left">{row.maximumPeopleOfRoom}</StyledTableCell>
                        <StyledTableCell align="left">{row.image}</StyledTableCell>
                        <StyledTableCell align="right" >
                          <Button variant="contained" color="primary" 
                          onClick={()=>{setModalIsOpen(true);
                          setCategoryId(row.categoryId);
                          setCategoryName(row.categoryName);
                          setDescription(row.description);
                          setPrice(row.price);
                          setNumberOfRoom(row.numberOfRoom);
                          setMaximumPeopleOfRoom(row.maximumPeopleOfRoom);
                          setImage(row.image);
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
