import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategories, addOrUpdateCategories } from '../../../Actions/roomCategoryAction';
import Header from '../Header';
import SlideBar from '../SlideBar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ManageServices() {
    const dispatch = useDispatch();
    const categoriesData = useSelector(state => state.categories.categories);
    
    const [data, setData] = useState();
    const [categoryId, setCategoryId] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [numberOfRoom, setNumberOfRoom] = useState(null);
    const [maximumPeopleOfRoom, setMaximumPeopleOfRoom] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [title,setTitle] = useState("");
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    

    const handleClose = () => {
      setOpen(false);
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
    
    const onSubmit = (categoryId, categoryName, description, price, numberOfRoom, maximumPeopleOfRoom) => {
      if(setCategoryId!==0){
        var item = {
        categoryId : categoryId,
        categoryName : categoryName, 
        description : description,
        price : price,
        numberOfRoom : numberOfRoom,
        maximumPeopleOfRoom : maximumPeopleOfRoom
      }
        var request = [item]
        dispatch(addOrUpdateCategories(request));
        dispatch(getCategories());
      }
      else {
        var item = {
          categoryId : 0,
          categoryName : categoryName, 
          description : description,
          price : price,
          numberOfRoom : numberOfRoom,
          maximumPeopleOfRoom : maximumPeopleOfRoom
        }
          var request = [item]
          dispatch(addOrUpdateCategories(request));
          dispatch(getCategories());
      }
    }

    const classes = useStyles();

    return(
      <div className="container">
          <SlideBar/>
          <div className="page-container">
              <Header/>
              <div className="main-content">
              <div className="big-content">ROOM CATEGORIES MANAGEMENT</div>
              <div className="add-button-area">
                <Button variant="contained" color="primary" onClick={()=> {handleClickOpen();setTitle("Add Room Category")}}>ADD</Button>
              </div>
              <div>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" >{title}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>To add or edit category, please enter data here. System will update occasionally.</DialogContentText>
                    <TextField autoFocus margin="dense" label="Category name" value={categoryName} onChange={e =>setCategoryName(e.target.value)} fullWidth/>
                    <TextField autoFocus margin="dense" label="Description" value={description} onChange={e =>setDescription(e.target.value)} fullWidth/>
                    <TextField autoFocus margin="dense" label="Price" value={price} onChange={e =>setPrice(e.target.value)}fullWidth/>
                    <TextField autoFocus margin="dense" label="Number of rooms" value={numberOfRoom} onChange={e =>setNumberOfRoom(e.target.value)}fullWidth/>
                    <TextField autoFocus margin="dense" label="Maximum people of room" value={maximumPeopleOfRoom} onChange={e =>setMaximumPeopleOfRoom(e.target.value)}fullWidth/>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={()=> {onSubmit(categoryId,categoryName,description,price,numberOfRoom,maximumPeopleOfRoom);handleClose()}}color="primary">Submit</Button>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                  </DialogActions>
                </Dialog>
              </div>
              <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell>Number of rooms</StyledTableCell>
                      <StyledTableCell>Maximum people of room</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>        
                  {categoriesData.map( (row, index) => (
                    <StyledTableRow key={index}>
                        <StyledTableCell align="left" component="th" scope="row">{index}</StyledTableCell>
                        <StyledTableCell align="left">{row.categoryName}</StyledTableCell>
                        <StyledTableCell align="left">{row.description}</StyledTableCell>
                        <StyledTableCell align="left">{row.price}</StyledTableCell>
                        <StyledTableCell align="left">{row.numberOfRoom}</StyledTableCell>
                        <StyledTableCell align="left">{row.maximumPeopleOfRoom}</StyledTableCell>
                        <StyledTableCell align="right" ><Button variant="contained" color="primary" onClick={()=>{{handleClickOpen()};setCategoryId(row.categoryId);setTitle("Edit Room Category")}}>EDIT</Button></StyledTableCell>
                        <StyledTableCell align="left" ><Button variant="contained" color="secondary" onClick={()=>dispatch(deleteCategories(row))}>DELETE</Button></StyledTableCell>
                        <StyledTableCell align="left" >
                          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                          <label htmlFor="icon-button-file">
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                          </IconButton>
                          </label>
                        </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
              <div className="add-icon-area">
              <Icon className="fa fa-plus-circle" color="primary" style={{ fontSize: 40 }} onClick={()=> {handleClickOpen();setTitle("Add Room Category")}}/>
              </div>
            </div>
          </div>
        </div>
      )}

      const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.common.black,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
      
      const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        input: {
          display: 'none',
        },
        table: {
          minWidth: 700,
        },
      }));