import {API_URL} from "../Constans/apiConstants";
import {END_POINT_REVIEWS, REVIEWS_GET} from "../Constans/reviewConstant";
import axios from 'axios'
import ToastServive from "react-material-toast";

const toast = ToastServive.new({
  place:'topRight',
  duration:2,
  maxCount:20
});
export const getReviewInCategory = (id) => {
  return async (dispatch) => {
    await axios.post(API_URL + END_POINT_REVIEWS, {categoryId: id}).then(res => {
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        dispatch(_getReviewInCategory(res.data.response.data));
      }
    })
  }
}

export const _getReviewInCategory = (reviews) => ({
  type: REVIEWS_GET,
  reviews
})

export const addReview = (review) => {
  return async (dispatch) => {
    console.log(review)
    await axios.post(API_URL + END_POINT_REVIEWS + '/add', {...review}).then(res => {
      if (res.status === 200 && res.data.status === 'SUCCESS'){
        toast.success('Add Review Success', () => {});
        dispatch(getReviewInCategory(review.categoryId));
      } else toast.error('Add Review Error', () => {});
    })
  }
}

export const deleteReview = (review) => {
  return async (dispatch) => {
    await axios.delete(API_URL + END_POINT_REVIEWS, {data: {...review}}).then(res => {
      if (res.status === 200 && res.data.status === 'SUCCESS'){
        toast.success('Delete Review Success', () => {});
        dispatch(getReviewInCategory(review.categoryId));
      } else toast.error('Delete Review Error', () => {});
    })
  }
}


