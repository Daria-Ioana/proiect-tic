<template>

<div>

   <nav class="navbar">

     <div class="nav-center">

       <div class="home">

         <router-link class="nav-link" active-class="active" to="/">Home</router-link>

       </div>

       <div class="nav-links"> 

         <router-link class="nav-link" active-class="active" to="/login">Login</router-link>
         <router-link class="nav-link" active-class="active" to="/register">Register</router-link>
         <router-link class="nav-link" active-class="active" to="/logout">Logout</router-link>

       </div>

     </div>
   
   </nav>

   <router-view></router-view>

</div>

</template>

<script>

export default {
  name: 'App',
  components: {    
  },
  data() {
 

    return {
      isLogged : localStorage.getItem('token') ? true : false
    }
  }
}

</script>

<style>
body{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}

.nav-link{
  text-decoration: none;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

.navbar{
  display: grid;
  background: #E76F51;
  height: 5rem;
  padding: 1rem;
  align-items: center;
  transition: all 0.5s linear;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.nav-center{
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 1rem;
}

.home{
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
}

.nav-links{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  column-gap: 1rem;
  justify-self: end;
}

.nav-link:hover{
  color: #E9C46A;
  cursor: pointer; 
}

</style>
