import React, { useEffect,useState } from 'react';
import Header from '../Header';
import SlideBar from '../SlideBar';
import Table from '@material-ui/core/Table';
import { useDispatch, useSelector } from 'react-redux';
import {getPromotions, removePromotion , addOrEditPromotion ,uploadImage } from '../../../Actions/promotionActions'
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import '../form.css';
import './style.css'
import Modal from 'react-modal';
import {StyledTableCell,StyledTableRow,useStyles} from '../css.js';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import {DATE_MSG , BLANK_MSG } from "../../../Constans/messageConstant";


export default function ManagePromotions() {
    const dispatch = useDispatch();
    const promotionsData = useSelector(state => state.promotions.promotions);
    const [promotionId , setPromotionId] = useState();
    const [code , setCode] = useState(null);
    const [description , setDescription] = useState(null);
    const [discount , setDiscount] = useState(0);
    const [sdate , setSdate] = useState(new Date());
    const [edate , setEdate] = useState(new Date());
    const [image , setImage] = useState('');
    const [title , setTitle] = useState();
    const [temp, setTemp] = useState();
    const [itemError, setItemErr] = useState({isErr: false ,msgCode: '',msgDescription: '',msgDiscount:'', msgSdate:'',msgEdate:''})
    const [modalDelete, setModalDelete] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        dispatch(getPromotions());
          
    }, []); 
    
    
    const onSubmit = (promotionId ,code , description , discount , sdate , edate ,image  ) => {
        
          
       
        var item = {
          
          promotionId : promotionId ,
          code : code ,
          description : description ,
          discount : discount ,
          sdate : sdate ,
          edate : edate ,
          image : image
          
        }
        
        let err = {};
        var request = [item]
        if(code==="" ){
          err.isErr = true;
          err.msgCode = BLANK_MSG;
          
          
        }
        if(description==="" ){
          err.isErr = true;
          err.msgDescription = BLANK_MSG;
          
          
        }
        if( discount === 0 ){
          err.isErr = true;
          err.msgDiscount = BLANK_MSG;
          
          
        }
        if( sdate === null ){
          err.isErr = true;
          err.msgSdate = BLANK_MSG;
         
          
        }
        if(edate == null){
          err.isErr = true;
          err.msgEdate = BLANK_MSG;
          
          
        }else
        if(sdate >= edate ){
          err.isErr = true;
          err.msgSdate = DATE_MSG;
          err.msgEdate = DATE_MSG;
          
        }    
        setItemErr(err);
        if (err.isErr) return  ;
        dispatch(addOrEditPromotion(request));
        
        
    }

    function handleImage(e) {
      let fileData = new FormData();
        
      fileData.append('multipartFile', e.target.files[0]);
      e.preventDefault();
      setImage(e.target.files[0].name);
      dispatch(uploadImage(fileData));
      
    }
    
 
    
    const classes = useStyles();
    
      return (
      <div className="container">
        <SlideBar/>
        <div className="page-container">
            <Header/>
            <div className="main-content">
            <h2>PROMOTION MANAGEMENT</h2>
            <div className="add-icon-area">
              <IconButton fontSize={'medium'} onClick={() => {  setModalIsOpen(true);
                                                                setTitle("ADD FORM")
                                                                setPromotionId(0);
                                                                setCode('');
                                                                setDescription('');
                                                                setDiscount(0);
                                                                setSdate(null);
                                                                setEdate(null); 
                                                                setImage('')}}>
                <AddCircle/>
              </IconButton>
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
                  <StyledTableCell>Image</StyledTableCell>
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
                  <StyledTableCell>{i.sdate}</StyledTableCell>
                  <StyledTableCell>{i.edate}</StyledTableCell>
                  <StyledTableCell>{i.image}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton aria-label="edit" onClick={() => {setPromotionId(i.promotionId);
                                                                  setModalIsOpen(true);
                                                                  setTitle('EDIT FORM')
                                                                  setCode(i.code);
                                                                  setDescription(i.description);
                                                                  setDiscount(i.discount);
                                                                  setSdate(i.sdate);
                                                                  setEdate(i.edate);
                                                                  setImage(i.image);
                                                                 }}>
                      <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={()=>{setModalDelete(true);setTemp(i)}}>
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
                              <button type="button" className="modal-close-button"   onClick={() =>{setModalIsOpen(false);setItemErr('')}}>
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
                                <div className="text-err">{itemError.isErr  ? itemError.msgCode: ''}</div>
                            </div>
                            <div className="row">
                                <div className="label">
                                    <label>Description</label>
                                </div>
                                <div className="content">
                                    <input type="text"  placeholder="Description.." defaultValue={description} onChange={e => setDescription(e.target.value)} />
                                </div>
                                <div className={'text-err'}>{itemError.isErr  ? itemError.msgDescription: ''}</div>
                            </div>
                            <div className="row">
                                <div className="label">
                                    <label>Discount</label>
                                </div>
                                <div className="content">
                                    <input type="text" placeholder="Discount.."  defaultValue={discount} onChange={e => setDiscount(e.target.value)} />
                                </div>
                                <div className={'text-err'}>{itemError.isErr  ? itemError.msgDiscount: ''}</div>
                            </div>
                            <div className="row">
                                <div className="label">
                                    <label>From</label>
                                </div>
                                <div className="content">
                                  
                                  <TextField
                                      id="date"
                                      type="date"
                                      className="date"
                                      defaultValue={sdate}
                                      onChange={e => setSdate(e.target.value)}
                                    />
                                </div>
                                <div className={'text-err'}>{itemError.isErr  ? itemError.msgSdate: ''}</div>
                            </div>
                            <div className="row">
                                <div className="label">
                                    <label>To</label>
                                </div>
                                <div className="content">
                                  
                                <TextField
                                    id="date"
                                    type="date"
                                    min={(sdate)}
                                    className="date"
                                    defaultValue={edate}
                                    onChange={e => setEdate(e.target.value)}
                                  />
                                </div>
                                <div className={'text-err'}>{itemError.isErr  ? itemError.msgEdate: ''}</div>
                            </div>
                            <div className="row">
                                <div className="label">
                                    <label>Image</label>
                                </div>
                                <div className="content">
                                  
                                  <input id="img" type="file" multiple  onChange={(e) => {handleImage(e)}} />
                                  
                                </div>
                               
                            </div>
                            <div class="row">
                                <input type="submit" value="Submit" onClick={()=>{onSubmit(promotionId,code,description,discount,sdate,edate,image); setModalIsOpen(false)}} />
                            </div>
                            
                            
                          </div>
                        </div>
                       </form>
            </Modal>
            
            <Dialog open={modalDelete} onClose={() => {setModalDelete(false)}} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure to delete this room category?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {setModalDelete(false)}} color="primary">
                    No
                  </Button>
                  <Button onClick={()=>{dispatch(removePromotion(temp));setModalDelete(false)}} color="primary" autoFocus>
                    Yes
                  </Button>
                </DialogActions>
            </Dialog>
              
                
            </div>
            </div>
            
        </div>
      </div>
)}





