import axios from 'axios'
import {API_URL} from "../Constans/apiConstants";
export const _getConvenience = (conveniences) => ({
    type: 'GET_CONVENIENCEs',
    conveniences
});

export const _deleteConvenience = (conveniences) => ({
    type: 'DELETE_CONVENIENCE',
    conveniences
})

export function getConveniences() {
    return (dispatch) => {
        return axios.get(API_URL+'/conveniences')
        .then(result => {
            const conveniences = [];
            if(result.data.response!=null){
                result.data.response.data.forEach(item => {
                conveniences.push(item);                
            });
            }
        dispatch(_getConvenience(conveniences));
        });
    };
}

export function deleteConveniences(conveniences) {
    return (dispatch) => {
        return axios.delete(API_URL+'/conveniences',{data: conveniences})
        .then(() => {
            dispatch(_deleteConvenience(conveniences));
        })
    }
}

export function addOrUpdateConveniences(conveniences){
    return (dispatch) => {
        return axios.post(API_URL+'/conveniences', {data: conveniences})
        .then(() => {
            dispatch(getConveniences());
        });
    }
}

