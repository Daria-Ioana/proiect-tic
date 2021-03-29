<template>

    <div class="logout-container">

        <label class="name"> Hello, {{user.name}}! </label>
        <label>{{user.id}}</label>
        <button v-on:click="logout" class="logout-button">Logout</button>

    </div>

</template>

<script>
import {logout} from '../services/auth-services';
import router from '../router/router';

export default {
    name: 'Logout',
    data() {
        return {
            user: {
                name: localStorage.getItem('name'),
                id: localStorage.getItem('id')
            }
        }
    },
    methods: {
        logout: () => {
            logout();
            router.replace('/login');
        }
    }
}
</script>

<style>
.logout-container{
    padding-top: 5rem;
}

.logout-button{
  display: inline-block;
  width: 30%; 
  max-width: 35rem;
  background: linear-gradient(to right, #f4a261, #e76f51);
  border: none;
  border-radius: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0.75rem;
  margin-top: 1rem;
}

.logout-button:hover{ 
  transition: all 0.5s linear;
  box-shadow: 0 0 10px #e9c46a;
}

.name{
    color: #fff;
    font-weight: bold;
    display: block;
    margin: 1rem;
    margin-bottom: 0;
}

@media screen and (max-width: 800px){
     .logout-button{
          max-width: 30rem;
     }   
}

@media screen and (max-width: 600px){
     .logout-button{
          max-width: 20rem;
     }
}

</style>