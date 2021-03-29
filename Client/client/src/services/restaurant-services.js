import axios from 'axios';
import {baseUrl} from '../utils/utils';

const restaurantsUrl = baseUrl + '/restaurants'

export const getRestaurants = () => {
    return axios.get(restaurantsUrl + '/getRestaurants')
    .then(res => res)
    .catch(err => {
        throw new Error(err.response.data.error);
    })
}

export const getRestaurantById = (id) => {
    return axios.get(restaurantsUrl + '/getRestaurants/'+ id)
    .then(res => res)
    .catch(err => {
        throw new Error(err.response.data.error);
    })
}

export const addRestaurant = (body) => {
    console.log(localStorage.getItem('token'))

    return axios.post(restaurantsUrl + '/addRestaurants', body, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    })
    .then(res => res)
    .catch(err => {
        throw new Error(err.response.data.error);
    })
}

export const updateRestaurant = (body, id) => {
    console.log(localStorage.getItem('token'))

    return axios.post(restaurantsUrl + '/updateRestaurants/' + id, body, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    })
    .then(res => res)
    .catch(err => {
        throw new Error(err.response.data.error);
    })
}

export const deleteRestaurant = (id) => {
    return axios.delete(restaurantsUrl + '/deleteRestaurants/' + id, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    })
    .then(res => res)
    .catch(err => {
        throw new Error(err.response.data.error);
    })
}