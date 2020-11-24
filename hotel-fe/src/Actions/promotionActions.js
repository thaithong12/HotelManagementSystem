import axios from 'axios'
import {API_URL} from "../Constans/apiConstants";
import { END_POINT_PROMOTION } from '../Constans/promotionConstant';
import ToastServive from 'react-material-toast';
import {SUCCESS_MSG, ERR_MSG} from "../Constans/messageConstant";   
    const toast = ToastServive.new({
        place:'topRight',
        duration:2,
        maxCount:20
    });
    
    
    export function addOrEditPromotion(promotion)  {

        
        
        return(dispatch) => {
            return axios.post(API_URL+ '/promotion',  {data: promotion}).then(() => {
                dispatch(getPromotions());
            })

            
        }
        
    }
    
    
    
    export const _removePromotion = (promotion) => ({
        type: 'REMOVE_PROMOTION',
        promotion
    });
    
    export function removePromotion(promotion)  {
        return(dispatch) => {
            return axios.delete(API_URL+ '/promotion', {data: promotion}).then( ()=> {
                dispatch(_removePromotion(promotion))
            }

            )
        }
    };
        
   
    
    export const _getPromotions = (promotions) => ({
        type: 'GET_PROMOTIONs',
        promotions
    });
    

    export function getPromotions() {
        return async (dispatch) => {
            return axios.get(API_URL + END_POINT_PROMOTION).then(res => {
              console.log(res.data.response)
              dispatch(_getPromotions(res.data.response.data));
            }).catch(err => {
              console.log(err)
            })
          }
    }