<template>

 <div class="container">

   <div class="restaurants-container">
     
     <table>
       
       <thead>
         
         <tr>

           <th>Name</th>
           <th>Type</th>
           <th>Phone</th>
           <th>Details</th>
           <th>Delete</th>

         </tr>

       </thead>

       <tbody>

         <tr v-bind:key="rest.id" v-for="rest in restaurants">
           
           <td>{{rest.name}}</td>
           <td>{{rest.type}}</td>
           <td>{{rest.phone}}</td>
           <td><button @click="goToDetails(rest.id)" class="details-button">Details</button></td>
           <td><button @click="deleteRestaurant(rest.id)" :disabled="!isAuth" class="delete-button">Delete</button></td>

         </tr>

       </tbody>

       <tfoot>

         <tr>
               
           <td colspan="5"><button @click="goToAdd()" :disabled="!isAuth" class="add-button">Add Restaurant</button></td>
 
         </tr>
       
       </tfoot>

     </table>

   </div>

 </div>

</template>

<script>
import {getRestaurants, deleteRestaurant} from '../services/restaurant-services';
import router from '../router/router';
 
export default {
  name: 'Home',
  data() {
    return {
      restaurants: [],
      isAuth: localStorage.getItem('token') ? true : false
    }
  },
  methods: {
    getAllRestaurants: function()  {
      let self = this;
      getRestaurants()
      .then(res => {
        self.restaurants = res.data;
      })
      .catch(err => console.log(err));
    },
    
    deleteRestaurant: function(id) {
      deleteRestaurant(id)
      .then(res => {
        console.log(res);
        this.getAllRestaurants();
      })
      .catch(err => console.log(err))
    },

    goToAdd: function() {
      router.push('/restaurantScreen/none')
    },

    goToDetails: function(id) {
      router.push('/restaurantScreen/'+id);
    }
  },
  mounted() {
    this.getAllRestaurants();
  }
}
</script>

<style>
body{
  height: 100%;
}

*, ::after, ::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container{
  position: relative;
}

.restaurants-container{
  padding-top: 5rem;
  min-height: calc(100vh - 5rem);
}

table{
  position: absolute;
  width: 80vw;
  max-width: 1500px; 
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  align-content: center;
  left: 50%;
  transform: translate(-50%, 0%);
}

th, td{
  padding: 15px;
  background-color: rgba(42, 157, 143, 0.3);
  color: #fff;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
}

th{
  text-transform: uppercase;
}

thead tr{
  background-color: rgba(42, 157, 143, 0.8);
}

tbody tr:hover{
  background-color: rgba(244, 162, 97, 0.3);
}

tbody td{
  position: relative;
}

.details-button, .delete-button{
  display: inline-block;
  border: none;
  border-radius: 1rem;
  background: rgba(233, 196, 106, 0.8);
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0.75rem;
  margin-top: 1rem;
}

.details-button:hover, .delete-button:hover{
  box-shadow: 0 0 10px #E9C46A;
}

.details-button:disabled, .delete-button:disabled{
  background: rgba(233, 196, 106, 0.5);
  box-shadow: none;
}

.add-button{
  background: linear-gradient(to right, #f4a261, #e76f51);
  border: none;
  border-radius: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0.75rem;
}

.add-button:hover{ 
  transition: all 0.5s linear;
  box-shadow: 0 0 10px #e9c46a;
}

.add-button:disabled{
   background: linear-gradient(to right,rgba(244, 162, 97, 0.5),rgba(231, 111, 81, 0.5));
   box-shadow: none;
}

@media screen and (max-width: 800px){
   table{
     width: 90vw;
     max-width: 700px; 
  }
}

@media screen and (max-width: 600px){
  table thead{
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr{
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625rem;
  }

  table td{
    border-bottom: 1px solid #ddd;
    display: block;
    text-align: center;
  }

  table td::before{
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

}
</style>