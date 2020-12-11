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

export function deleteImage(images){
    return async (dispatch) => {
        return await axios.delete(API_URL+'/upload',{data: {...images}}).then(res => {
            dispatch(getServices())
        });
    }
}

export function uploadImage(fileData, item){
    return (dispatch) => {
        return axios.post(API_URL+'/upload', fileData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(result => {
            for (let i = 0; i < item.imageEntities.length; i++) {
                item.imageEntities[i].url = result.data[i];
            }
            var request = [item];
            if(item.serviceName===""){
            dispatch(getServices());
            }
            else{
            dispatch(addOrUpdateServices(request));
            }
        });
    }
}

export function getServices() {
    return (dispatch) => {
        return axios.get(API_URL+'/services')
        .then(result => {
            const services = [];
            if(result.data.response!=null){
                result.data.response.data.forEach(item => {
                services.push(item);                
            }
        )};
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




