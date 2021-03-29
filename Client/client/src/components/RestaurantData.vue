<template>

<div class="form-container">

 <div class="restaurant-box">

     <form v-on:submit="addOrUpdateRestaurant">

         <div class="user-box">

             <input type="text" v-model="restaurant.name"/>
             <label>Name</label>

         </div>

         <div class="user-box">

             <input type="text" v-model="restaurant.city"/>
             <label>City</label>

         </div>

         <div class="user-box">

             <input type="text" v-model="restaurant.address"/>
             <label>Address</label>

         </div>

         <div class="user-box">

              <input type="text" v-model="restaurant.type"/>
              <label>Type</label>

         </div>

         <div class="user-box">

             <input type="phone" v-model="restaurant.phone"/>
             <label>Phone</label>
             
         </div>

        <button :disabled="!isAuth" type="submit" class="button">{{buttonText}}</button>

    </form>

    </div>

    </div>

</template>

<script>
import {getRestaurantById, addRestaurant, updateRestaurant} from '../services/restaurant-services';
import router from '../router/router';

export default {
    name: 'RestaurantData',
    props: ['restId'],
    data() {
        console.log(this.restId)
        return {
            restaurant: {},
            id: this.restId,
            isAdd: this.restId === 'none',
            buttonText: this.restId ==='none' ? 'Add' : 'Update',
            isAuth: localStorage.getItem('token') ? true : false
        }
    },
    methods: {
        getRestaurant: function(id) {
            let self = this;
            if(!self.isAdd)
            {
                getRestaurantById(id)
                .then(res => {
                self.restaurant = {
                    name: res.data.name,
                    address: res.data.address,
                    city: res.data.city,
                    type: res.data.type,
                    phone: res.data.phone
                }
                })
                .catch(err => console.log(err));
            }
            else {
                self.restaurant = {
                    name: '',
                    address: '',
                    city: '',
                    type: '',
                    phone: ''
                }
            }
            
        },

        addOrUpdateRestaurant: function(e) {
            e.preventDefault();
            let self = this;
            if(self.isAdd) {
                addRestaurant(self.restaurant)
                .then(res => {
                    console.log(res);
                    router.push('/');
                    }
                )
                .catch(err => console.log(err));
            }
            else {
                updateRestaurant(self.restaurant, self.restId)
                .then(res => {
                    console.log(res);
                    router.push('/');
                })
                .catch(err => console.log(err));
            }

        }
    },
    mounted() {
        this.getRestaurant(this.restId);
    }
}
</script>

<style>
.form-container{
    min-height: 100vh; 
}

.restaurant-box{
  position: absolute;
  top: 65%;
  left: 50%;
  width: 50vw;
  max-width: 35rem;
  padding: 3rem;
  transform: translate(-50%, -65%);
  background: #2A9D8F;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 1rem;
}

.restaurant-box .user-box{
  position: relative;
}

.restaurant-box .user-box input{
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.restaurant-box .user-box label{
  position: absolute;
  top: -20px;
  left: 0;
  padding: 1rem 0;
  font-size: 12px;
  color: #264653;
  pointer-events: none;
  transition: 0.5s;
  font-weight: bold;
}

.button{
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

.button:hover{ 
  transition: all 0.5s linear;
  box-shadow: 0 0 10px #e9c46a;
}

.button:disabled{
   opacity: 0.7;
}

@media screen and (max-width: 800px){
    .restaurant-box{
    width: 70vh;
    max-width: 30rem;
    }
}

@media screen and (max-width: 600px){
    .restaurant-box{
    width: 50vh;
    max-width: 20rem;
    padding: 2rem;
    }
}

</style>