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

export function getCategories() {
    return (dispatch) => {
        return axios.get(API_URL+'/categories')
        .then(result => {
            const categories = [];
            result.data.response.data.forEach(item => {
                categories.push(item);                
            });
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
    }
}
