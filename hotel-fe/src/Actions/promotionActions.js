import axios from 'axios'
import { useState } from 'react';
import {API_URL} from "../Constans/apiConstants";

    
    
    export function addOrEditPromotion(promotion)  {

        
        
        return(dispatch) => {
            return axios.post(API_URL+ '/promotion',  {data: promotion}).then(() => {
                dispatch(getPromotions());
            });

            
        }
    };
    
 
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
            return axios.get(API_URL + '/promotion').then(res => {
              console.log(res.data.response)
              dispatch(_getPromotions(res.data.response.data));
            }).catch(err => {
              console.log(err)
            })
          }
    }