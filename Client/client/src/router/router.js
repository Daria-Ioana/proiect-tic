import {createRouter, createWebHistory} from 'vue-router';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import Logout from '../components/Logout';
import RestaurantScreen from '../components/RestaurantScreen';
import EmployeesData from '../components/EmployeesData';

    const routes = [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        },
        {
            path: '/restaurantScreen/:id',
            name: 'RestaurantScreen',
            component: RestaurantScreen
        },
        {
            path: '/employees/:restId/:empId',
            name: 'EmployeesData',
            component: EmployeesData
        }
    ]

    const router = createRouter({
        history: createWebHistory('/'),
        routes
    })

    export default router;