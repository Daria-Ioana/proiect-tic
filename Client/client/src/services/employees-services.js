import axios from 'axios';
import {baseUrl} from '../utils/utils';

const employeesUrl = baseUrl + '/employees'

export const getEmployees = (restId) => {
    return axios.get(employeesUrl + '/getEmployeesByRestaurant/' + restId)
    .then(emp => emp)
    .catch(err => {
        throw new Error(err.response.data.error);
    })
}

export const getEmployeesById = (restId, empId) => {     
    return axios.get(employeesUrl + '/getEmployeesByRestaurantAndById/'+ restId + '/' + empId)
    .then(emp => emp)     
    .catch(err => {         
        throw new Error(err.response.data.error);
    })
 }

export const updateEmployee = (body, restId, empId) => {
     console.log(localStorage.getItem('token'))
     return axios.post(employeesUrl + '/updateEmployees/' + restId + '/' + empId, body, {
         headers: {
             'auth-token': localStorage.getItem('token')
         }
     })
     .then(res => res)
     .catch(err => {
         throw new Error(err.response.data.error);
     })
 }

export const deleteEmployee = (restId, empId) => {
    return axios.delete(employeesUrl + '/deleteEmployees/' + restId + '/' + empId, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    })
    .then(res => res)
    .catch(err => {
        throw new Error(err.response.data.error);
    })
}

export const addEmployee = (body, restId) => {
    console.log(localStorage.getItem('token'))
    return axios.post(employeesUrl + '/addEmployees/' + restId, body, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    })
    .then(res => res)
    .catch(err => {
        throw new Error(err.response.data.error);
    })
}