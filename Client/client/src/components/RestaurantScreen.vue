<template>

 <div>

     <RestaurantData v-bind:restId="this.restId"/>

     <div class="container-details">

        <div class="employees-container">
     
             <table v-if="!isAdd" class="employees-table">
       
                 <thead>
         
                     <tr>

                         <th>First name</th>
                         <th>Last name</th>
                         <th>Phone</th>
                         <th>Position</th>
                         <th>Salary</th>
                         <th>Details</th>
                         <th>Delete</th>

                     </tr>

                 </thead>

                 <tbody>

                     <tr v-bind:key="emp.id" v-for="emp in employees">
           
                         <td>{{emp.firstName}}</td>
                         <td>{{emp.lastName}}</td>
                         <td>{{emp.mobilePhone}}</td>
                         <td>{{emp.position}}</td>
                         <td>{{emp.salary}}</td>
                         <td><button @click="goToDetails(emp.id)" class="details-button">Details</button></td>
                         <td><button @click="deleteEmployee(emp.id)" :disabled="!isAuth" class="delete-button">Delete</button></td>

                     </tr>

                 </tbody>

                 <tfoot>

                     <tr>
               
                         <td colspan="7"><button @click="goToAdd()" :disabled="!isAuth" class="add-button">Add Employee</button></td>
 
                     </tr>
       
                 </tfoot>

             </table>

         </div>

     </div>

 </div> 

</template>

<script>
import RestaurantData from './RestaurantData';
import {getEmployees, deleteEmployee} from '../services/employees-services';
import router from '../router/router';


export default {
    

    name: 'RestaurantScreen',
    data() {
        return {
            restId: '',
            isAdd: false,
            employees: [],
            isAuth: localStorage.getItem('token') ? true : false
        }
    },
    created() {
        this.restId = this.$route.params.id;
        this.isAdd = this.restId === 'none';
        if(!this.isAdd)this.getEmployees();
    },
    components: {
        RestaurantData
    },
    methods: {
        getEmployees: function() {
            let self = this;
            getEmployees(self.restId)
            .then(res => {
                self.employees = res.data;
            })
            .catch(err => console.log(err));
        },

        goToDetails: function(empId) {
            router.push('/employees/' + this.restId + '/' + empId);
        },

        deleteEmployee: function(empId) {
            deleteEmployee(this.restId, empId)
            .then(res => {
                console.log(res);
                this.getEmployees();
            })
            .catch(err => console.log(err));
        },

        goToAdd: function() {
            router.push('/employees/' + this.restId + '/none');
        }
    }
}
</script>

<style>
/*.container-details{
  position: relative;
}*/

.employees-container{
  position: relative;
}

.employees-table{
  position: absolute;
  width: 80vw;
  max-width: 1500px; 
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  align-content: center;
  min-height: 100vh;
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

/*tbody td:hover::before{
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -9999px;
  bottom: -9999px;
  background-color: rgba(244, 162, 97, 0.2);
  z-index: -1;
}*/

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

@media screen and (max-width: 900px){

  .employees-table thead{
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

  .employees-table tr{
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625rem;
  }

  .employees-table td{
    border-bottom: 1px solid #ddd;
    display: block;
    text-align: center;
  }

  .employees-table td::before{
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

}
</style>