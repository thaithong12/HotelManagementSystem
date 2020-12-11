import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategories, uploadImage} from '../../../Actions/roomCategoryAction';
import { getConveniences } from '../../../Actions/convenienceAction';
import Header from '../Header';
import SlideBar from '../SlideBar';

import BackspaceIcon from '@material-ui/icons/Backspace';
import Select from "@material-ui/core/Select";
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



export default function ManageCategories() {
    const dispatch = useDispatch();
    const categoriesData = useSelector(state => state.categories.categories);
    const conveniencesData = useSelector(state => state.conveniences.conveniences);

    const [convenientEntities, setConvenientEntities] = useState([{convenientName:""}]);
    const [categoryId, setCategoryId] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [numberOfRoom, setNumberOfRoom] = useState(null);
    const [maximumPeopleOfRoom, setMaximumPeopleOfRoom] = useState(null);
    const [imageEntities, setImageEntities] = useState([]);
    const [open1, setOpen1] = React.useState(false);
    const [temp, setTemp] = useState();
    const [title, setTitle] = useState();
    
    const handleClickOpen1 = () => {
      setOpen1(true);
    };

    const handleClose1 = () => {
      setOpen1(false);
    };

    const onChange = e =>{
      setImageEntities(e.target.files)
    }

    useEffect(() => {
      dispatch(getCategories());
      dispatch(getConveniences());
    }, []);

    const handleSelect = (e) => {
      e.preventDefault();
      
      let options = e.target.options;
      let value = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          let obj = {convenientId: options[i].value, convenientName: options[i].text};
          value.push(obj);
        }
      }
      setConvenientEntities(value);
    }
    
    const onSubmit = (categoryId, categoryName, description, price, numberOfRoom, maximumPeopleOfRoom, convenientEntities, imageEntities) => {
        const fileData = new FormData();
        var Files = [];
        for (let i = 0; i < imageEntities.length; i++) {
          imageEntities[i].url=imageEntities[i].name;
          fileData.append("multipartFile", imageEntities[i]);
          Files.push(imageEntities[i]);
        }

      
        var item = {
          categoryId : categoryId,
          categoryName : categoryName, 
          description : description,
          price : price,
          numberOfRoom : numberOfRoom,
          maximumPeopleOfRoom : maximumPeopleOfRoom,
          convenientEntities : convenientEntities,
          imageEntities : Files
        }

        dispatch(uploadImage(fileData,item));
    }

    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return(
      <div className="container">
          <SlideBar/>
          <div className="page-container">
              <Header/>
              <div className="form-container">
              
              <h2>ROOM CATEGORIES  MANAGEMENT</h2>
              <div className="add-icon-area">
              <IconButton fontSize={'medium'} onClick={() => {
                setModalIsOpen(true);
                setTitle("ADD FORM");
                setCategoryId(0);
                setCategoryName('');
                setDescription('');
                setPrice(null);
                setNumberOfRoom(null);
                setMaximumPeopleOfRoom(null)}}>
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
                                <label>Convenience Name</label>
                              </div>
                              <Select className={'content'}
                                      native inputRef={conveniencesData}
                                      onChange={(e) => handleSelect(e)}
                                      multiple>
                                {(conveniencesData && conveniencesData.length > 0) ?
                                  conveniencesData.map((row) => (
                                  <option value={row.convenientId} >{row.convenientName}</option>
                                  )): <option aria-label="None" value=""/>}
                              </Select>
                              </div>

                            <div className="row">
                                <div className="label">
                                    <label>Image</label>
                                </div>
                                <div className="content">
                                    <input type="file"  multiple defaultValue={imageEntities} onChange={onChange} />
                                </div>
                            </div>

                            
                            <div class="row">
                                <input type="submit" value="Submit" onClick={()=>{setModalIsOpen(false);onSubmit(categoryId,categoryName,description,price,numberOfRoom,maximumPeopleOfRoom,convenientEntities,imageEntities)}} />
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
                      <StyledTableCell>Conveniences name</StyledTableCell>
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
                        <StyledTableCell align="left">{((row.convenientEntities) && (row.convenientEntities).length>0) ? (row.convenientEntities).map((name) => (name.convenientName + " / ")):""}</StyledTableCell>
                        <StyledTableCell align="left">{((row.images) && (row.images).length>0) ? (row.images).map((image) => (
                        [<img style={{height: 40,width: 40}} src={'../images/'+image.url} alt="Admin"/>,
                        <BackspaceIcon className="delete-image-button"/>]
                        )):""}</StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton aria-label="edit" onClick={()=>{setModalIsOpen(true);
                            setCategoryId(row.categoryId);
                            setCategoryName(row.categoryName);
                            setDescription(row.description);
                            setPrice(row.price);
                            setNumberOfRoom(row.numberOfRoom);
                            setMaximumPeopleOfRoom(row.maximumPeopleOfRoom);
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
