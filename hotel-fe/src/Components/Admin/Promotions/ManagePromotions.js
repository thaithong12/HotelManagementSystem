import React, { useEffect,useRef,useState } from 'react';
import Header from '../Header';
import SlideBar from '../SlideBar';
import Table from '@material-ui/core/Table';
import { useDispatch, useSelector } from 'react-redux';
import {getPromotions, removePromotion} from '../../../Actions/promotionActions'
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import {addOrEditPromotion} from '../../../Actions/promotionActions';
import './style.css';
import Modal from 'react-modal';
import {StyledTableCell,StyledTableRow,useStyles} from './css.js';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactDatePicker from 'react-datepicker';
import TextField from '@material-ui/core/TextField';

export default function ManagePromotions() {
    const dispatch = useDispatch();
    
    //const [data, setData] = useState({ listData: []});
    const promotionsData = useSelector(state => state.promotions.promotions);

    const [data, setData] = useState();
    const [promotionId , setPromotionId] = useState();
    const [code , setCode] = useState(null);
    const [description , setDescription] = useState(null);
    const [discount , setDiscount] = useState(0);
    const [sdate , setSdate] = useState(new Date('2017-05-24'));
    const [edate , setEdate] = useState(new Date());
    let [itemExecute ,  setItem] = useState({});
    const [title , setTitle] = useState();
    const [open1, setOpen1] = React.useState(false);
    const [temp, setTemp] = useState();
    const handleClickOpen1 = () => {
      setOpen1(true);
    };
    const handleClose1 = () => {
      setOpen1(false);
    };
    useEffect(() => {
        

        dispatch(getPromotions());
        setData(promotionsData);
          
          
      
    }, []); 
    
    
    const onSubmit = (promotionId ,code , description , discount , sdate , edate ) => {


        var item = {
          
          promotionId : promotionId ,
          code : code ,
          description : description ,
          discount : discount ,
          sdate : sdate ,
          edate : edate
        }
        
        
        var request = [item]
        if(code=="" || description=="" || discount == 0 || sdate == null || edate == null){
          dispatch(getPromotions());
          alert('Nhập thiếu!')
        }
        else{
          dispatch(addOrEditPromotion(request));
        }
        
        
    }
    console.log(sdate);
    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false)
      return (
      <div className="container">
        <SlideBar/>
        <div className="page-container">
            <Header/>
            <div className="main-content">
            <div className="big-content">PROMOTION MANAGEMENT</div>
            <div className="add-icon-area">
              <IconButton fontSize={'medium'} onClick={() => {
                setModalIsOpen(true);
                setTitle("ADD FORM")
                setPromotionId(0);
                setCode('');
                setDescription('');
                setDiscount(0);
                setSdate(null);
                setEdate(null);
              }}>
                <AddCircle/>
              </IconButton>
            </div>
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
                    <Button onClick={()=>{dispatch(removePromotion(temp));handleClose1()}} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            <TableContainer component={Paper}>
            <Table  className={classes.table} aria-label="customized table" >
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Code</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Discount</StyledTableCell>
                  <StyledTableCell>From</StyledTableCell>
                  <StyledTableCell>To</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  
                {(promotionsData && promotionsData.length > 0) ? promotionsData.map( ( i , index )=> (
                <StyledTableRow key = {index} >
                  <StyledTableCell>{index+1}</StyledTableCell>
                  <StyledTableCell>{i.code}</StyledTableCell>
                  <StyledTableCell>{i.description}</StyledTableCell>
                  <StyledTableCell>{i.discount}</StyledTableCell>
                  <StyledTableCell><Moment format="DD/MM/YYYY">{i.sdate}</Moment></StyledTableCell>
                  <StyledTableCell><Moment format="DD/MM/YYYY">{i.edate}</Moment></StyledTableCell>
                  <StyledTableCell>
                    <IconButton aria-label="edit" onClick={() => {setPromotionId(i.promotionId);
                                                                  setModalIsOpen(true);
                                                                  setTitle('EDIT FORM')
                                                                  setCode(i.code);
                                                                  setDescription(i.description);
                                                                  setDiscount(i.discount);
                                                                  setSdate(i.sdate);
                                                                  setEdate(i.edate)}}>
                      <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={()=>{handleClickOpen1();setTemp(i)}}>
                            <DeleteIcon fontSize="small"/>
                    </IconButton>
                    
                  </StyledTableCell>
                </StyledTableRow> ))
                : (<tr className={'text-center'}><td colSpan={5}>Không có dữ liệu lúc này</td></tr>)}
                
                  
              </TableBody>
            </Table>
            </TableContainer>
            <div>
            
            <Modal isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    className="form">
                        <form onSubmit={onSubmit}>
                        <div className="modal-overlay"/>
                        <div className="modal-wrapper">
                          <div className="modal">
                            <div className="modal-header">
                              <button type="button" className="modal-close-button"   onClick={() =>{setModalIsOpen(false);}}>
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <h2>{title}</h2>
                            <div className="row">
                                <div className="label">
                                    <label>Code</label>
                                </div>
                                <div className="content">
                                    <input type="text"  placeholder="Code.." required=""   defaultValue={code} onChange={e => setCode(e.target.value)} />
                                   
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="label">
                                    <label>Description</label>
                                </div>
                                <div className="content">
                                    <input type="text"  placeholder="Description.." defaultValue={description} onChange={e => setDescription(e.target.value)} />
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="label">
                                    <label>Discount</label>
                                </div>
                                <div className="content">
                                    <input type="text" placeholder="Discount.."  defaultValue={discount} onChange={e => setDiscount(e.target.value)} />
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="label">
                                    <label>From</label>
                                </div>
                                <div className="content">
                                  
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={sdate}
                                    onChange={e => setSdate(e.target.value)}
                                  />
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="label">
                                    <label>To</label>
                                </div>
                                <div className="content">
                                  
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={edate}
                                    onChange={e => setEdate(e.target.value)}
                                  />
                                </div>
                                
                            </div>
                           
                            <div class="row">
                                <input type="submit" value="Submit" onClick={()=>{onSubmit(promotionId,code,description,discount,sdate,edate);setModalIsOpen(false)}} />
                            </div>
                            
                            
                          </div>
                        </div>
                       </form>
            </Modal>
                
            </div>
            </div>
            
        </div>
      </div>
)}





