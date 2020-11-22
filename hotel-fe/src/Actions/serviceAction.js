import axios from 'axios'
import {API_URL} from "../Constans/apiConstants";
export const _getService = (services) => ({
    type: 'GET_SERVICEs',
    services
});

export const _deleteService = (services) => ({
    type: 'DELETE_SERVICE',
    services
})

export function getServices() {
    return (dispatch) => {
        return axios.get(API_URL+'/services')
        .then(result => {
            const services = [];
            result.data.response.data.forEach(item => {
                services.push(item);                
            });
        dispatch(_getService(services));
        });
    };
}

export function deleteServices(services) {
    return (dispatch) => {
        return axios.delete(API_URL+'/services',{data: services})
        .then(() => {
            dispatch(_deleteService(services));
        })
    }
}

export function addOrUpdateServices(services){
    return (dispatch) => {
        return axios.post(API_URL+'/services', {data: services})
        .then(() => {
            dispatch(getServices());
        });
    };
}



