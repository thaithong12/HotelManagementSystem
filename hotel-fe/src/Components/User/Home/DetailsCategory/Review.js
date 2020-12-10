import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addReview, deleteReview, getReviewInCategory} from "../../../../Actions/reviewAction";
import {useLocation} from "react-router-dom";
import {_getCurrenUser} from "../../../../Actions/userActions";
import {history} from "../../../../Helper/history";
import StarRateIcon from '@material-ui/icons/StarRate';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
export default function Review(){
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.reviews);
  const row = useLocation().state[0];
  const curUser = useSelector(state => state.user);
  let jwt = localStorage.getItem('Authorization');
  const [modalDelete, setModal] = useState(false);
  const [idDelete, setId] = useState(0);
  const [itemErr, setItem] = useState({isErr: false, msg: ''})

  const [review, setReview] = useState({
    categoryId: row.categoryId,
    rate: 5,
    content: '',
    token: jwt ? jwt : ''
  });
  useEffect(() => {
    dispatch(getReviewInCategory(row.categoryId));
    dispatch(_getCurrenUser());
  }, [])
  function validation() {
    if (review.token < 0 || review.token > 5)
      setItem({...itemErr, isErr: true,msg: 'Rate not Valid'});
    if (review.content === '')
      setItem({...itemErr, isErr: true, msg: 'Content cannot blank'})
  }
  function handleSubmit(e) {
    e.preventDefault();
    //clear msg
    setItem({...itemErr,msg: '', isErr: false})
    // validate
    validation();
    if (itemErr.isErr === true)
      return ;
    if (curUser && curUser.loggedIn){
      dispatch(addReview(review));
    } else {
      history.push('/login')
    }
  }
  function handleChange(e) {
    setReview({...review, [e.target.name] : e.target.value});
  }

  function handleDelete(e) {
    e.preventDefault();
    if (idDelete != 0)
      dispatch(deleteReview({...review, id: idDelete}));
    closeModal();
  }

  function closeModal() {
    setModal(false);
  }

  function openModal(e, id) {
    e.preventDefault();
    setId(id);
    setModal(true);
  }

  return(

    <div className="review-room">
      <Dialog open={modalDelete} onClose={() => {closeModal()}} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {closeModal()}} color="primary">
            No
          </Button>
          <Button onClick={(e)=>{handleDelete(e)}} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <h3>REVIEW</h3>
      <div className="border-rv"></div>
      <div className="review-room-center">
        {reviews && reviews.length > 0 ? reviews.map((row, key) => (
          <div className="review-room-content">
            <div className="review-room-avatar">
              <img  src="../images/avatar.png"/>
            </div>
            <div className="review-room-description">
              <div className="author">
                <h4>{row.accountName}</h4>
                {curUser && curUser.loggedIn && curUser.isAdmin ?
                  (<button onClick={(e) => openModal(e, row.id)}
                           type="button" className="button-delete-rv" >
                  <span aria-hidden="true">&times;</span>
                </button>) : ''}

              </div>
              <div className="rate">
                {[...Array(row.rate).keys()].map(value => (
                  <StarRateIcon color={"primary"}/>
                ))}
              </div>
              <div className="review-room-comment">
                <p>{row.content}</p>
              </div>
            </div>
          </div>
        )): <span className={'text-center'}>Not Have Comment</span>}

        <div className="border-rv"></div>
          <div className="review-room-input">

            <input name='content' type="text" placeholder={'Input Comment Here'}
                   onChange={(e) => handleChange(e)}/>
            <select name='rate' onChange={(e) => handleChange(e)}>
              {[...Array(5).keys()].map((value)=> (
                <option selected={review.rate === (value + 1)} value={value + 1}>{value + 1}</option>
              ))}
            </select>
            <button onClick={(e) => {handleSubmit(e)}}>Submit</button>

          </div>
        {itemErr.isErr ? (<p className={'text-center'} style={{color: "red"}}>{itemErr.msg}</p>) : ''}
      </div>

    </div>

  );
}
