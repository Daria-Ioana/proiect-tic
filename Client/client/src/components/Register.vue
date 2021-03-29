<template>

   <div class="register-box">

     <form v-on:submit="register">

       <div class="user-box">
          
         <input class="form-field" type="text" name="name" required="">
         <label>Name</label>

       </div>

       <div class="user-box">
          
         <input class="form-field" type="text" name="email" required="">
         <label>E-mail</label>

       </div>

       <div class="user-box">
          
         <input class="form-field" type="password" name="password" required="">
         <label>Password</label>

       </div>

       <button class="register-button">Register</button>

    </form>

   </div>

</template>

<script>
import {register} from '../services/auth-services';
import router from '../router/router';

export default {
  name: 'Register',
  methods: {
    register: (e) => {
      e.preventDefault();
      const formInputValues = {
        name: e.target.elements.name.value,
        password: e.target.elements.password.value,
        email: e.target.elements.email.value
      }
      
      register(formInputValues)
      .then(res => {
        console.log(res.data.message);
        router.push('/login');
      })
      .catch(err => {
        console.log(err);
      })
    }

  }

}

</script>

<style>
body{
  background-image: linear-gradient(to bottom, rgba(231, 111, 81, 0.5), rgba(244, 162, 97, 0.5), rgba(233, 196, 106, 0.5), rgba(255, 255, 255, 0.5)), 
  url('~@/assets/backgroundLaptop.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.register-box{
  position: absolute;
  top: 60%;
  left: 50%;
  width: 50vw;
  max-width: 35rem;
  padding: 3rem;
  transform: translate(-50%, -60%);
  background: #2A9D8F;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 1rem;
}

.register-box .user-box{
  position: relative;
}

.register-box .user-box input{
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.register-box .user-box label{
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
  font-weight: bold;
}

.register-box .user-box input:focus ~ label,
.register-box .user-box input:valid ~ label{
  top: -20px;
  left: 0;
  color: #264653;
  font-size: 12px;
}


.register-button{
  display: inline-block;
  width: 100%; 
  background: linear-gradient(to right, #f4a261, #e76f51);
  border: none;
  border-radius: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0.75rem;
  margin-top: 1rem;
}

.register-button:hover{ 
  transition: all 0.5s linear;
  box-shadow: 0 0 10px #e9c46a;
}

@media screen and (max-width: 800px){
    body{
    background-image: linear-gradient(to bottom, rgba(231, 111, 81, 0.5), rgba(244, 162, 97, 0.5), rgba(233, 196, 106, 0.5), rgba(255, 255, 255, 0.5)), 
    url('~@/assets/backgroundTablet.jpg');
    } 

    .register-box{
    width: 70vw;
    max-width: 30rem;
    }
}

@media screen and (max-width: 600px){
    body{
    background-image: linear-gradient(to bottom, rgba(231, 111, 81, 0.5), rgba(244, 162, 97, 0.5), rgba(233, 196, 106, 0.5), rgba(255, 255, 255, 0.5)), 
    url('~@/assets/backgroundPhone.jpg');
    } 

    .register-box{
    width: 50vw;
    max-width: 20rem;
    padding: 2rem;
    }
}
</style>