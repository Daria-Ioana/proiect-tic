import axios from 'axios';
import {baseUrl} from '../utils/utils';

const baseAuthUrl = baseUrl + '/authentication';

export const register = (formInputs) => {
    return axios.post(baseAuthUrl + "/register", formInputs)
    .then(res => {
        return res;
    })
    .catch(err => {
        throw new Error(err.response.data.error);
    })
}

export const login = (formInputs) => {
    return axios.post(baseAuthUrl + '/login', formInputs)
    .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('userId', res.data.id);

        return res;
    })
    .catch(err => {
        const error = new Error(err.response.data.error);
        throw error;
    });
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
}