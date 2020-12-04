import axios from 'axios'
import {API_URL} from "../Constans/apiConstants";
export const _getCategory = (categories) => ({
    type: 'GET_CATEGORYs',
    categories
});

export const _deleteCategory = (categories) => ({
    type: 'DELETE_CATEGORY',
    categories
})

export function uploadImage(fileData){
    return (dispatch) => {
        return axios.post(API_URL+'/upload', fileData, {headers: {'Content-Type': 'multipart/form-data'}});
    }
}

export function getCategories() {
    return (dispatch) => {
        return axios.get(API_URL+'/categories')
        .then(result => {
            const categories = [];
            if(result.data.response!=null){
                result.data.response.data.forEach(item => {
                categories.push(item);  
            }             
        )};
        dispatch(_getCategory(categories));
        });
    };
}

export function deleteCategories(categories) {
    return (dispatch) => {
        return axios.delete(API_URL+'/categories',{data: categories})
        .then(() => {
            dispatch(_deleteCategory(categories));
        })
    }
}

export function addOrUpdateCategories(categories){
    return (dispatch) => {
        return axios.post(API_URL+'/categories', {data: categories})
        .then(() => {
            dispatch(getCategories());
        });
    }
}

