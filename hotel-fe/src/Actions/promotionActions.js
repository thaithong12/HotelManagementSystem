import axios from 'axios'
import {API_URL} from "../Constans/apiConstants";
import { END_POINT_PROMOTION } from '../Constans/promotionConstant';


    export function uploadImage(fileData){
        return (dispatch) => {
            return axios.post(API_URL+'/upload', fileData, {headers: {'content-type': 'multipart/form-data'}});
        }
    }

    
    
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
              dispatch(_getPromotions(res.data.response.data));
            }).catch(err => {
              console.log(err)
            })
          }
        
    }
