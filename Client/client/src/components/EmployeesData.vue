<template>

<div class="form-container">

 <div class="employees-box">

     <form v-on:submit="addOrUpdateEmployee">

         <div class="user-box">

             <input type="text" v-model="employee.firstName"/>
             <label>First Name</label>

         </div>

         <div class="user-box">

             <input type="text" v-model="employee.lastName"/>
             <label>Last Name</label>

         </div>

         <div class="user-box">

             <input type="phone" v-model="employee.mobilePhone"/>
             <label>Phone</label>
             
         </div>

         <div class="user-box">

             <input type="text" v-model="employee.position"/>
             <label>Position</label>

         </div>

         <div class="user-box">

             <input type="number" v-model="employee.salary"/>
             <label>Salary</label>

         </div>

        <button :disabled="!isAuth" type="submit" class="button">{{buttonText}}</button>

    </form>

    </div>
    
 </div>

</template>

<script>
import {getEmployeesById, updateEmployee, addEmployee} from '../services/employees-services';
import router from '../router/router';

export default {
    name: 'EmployeeData',

    data() {
        
        return {
            employee: {
                firstName: '',
                lastName: '',
                mobilePhone: '',
                position: '',
                salary: ''
            },
            empId: this.$route.params.empId,
            restId: this.$route.params.restId,
            isUpdate: (this.$route.params.empId !== '' && this.$route.params.empId !== 'none'),
            buttonText: 'Add',
            isAuth: localStorage.getItem('token') ? true : false
        }
    },
    methods: {
        getEmployee: function() {
            const self = this;
            getEmployeesById(this.restId, this.empId)
            .then(res => {
                self.employee.firstName = res.data.firstName;
                self.employee.lastName = res.data.lastName;
                self.employee.mobilePhone = res.data.mobilePhone;
                self.employee.position = res.data.position;
                self.employee.salary = res.data.salary;
            })
            .catch(err => console.log(err));
        },

        updateEmployee: function() {
            const self = this;
            updateEmployee(self.employee, self.restId, self.empId)
            .then(res => {
                console.log(res);
                router.replace('/restaurantScreen/'+ self.restId);
            })
            .catch(err => console.log(err));
        },

        addEmployee: function() {
            
            addEmployee(this.employee, this.restId)
            .then(res => {
                console.log(res);
                router.replace('/restaurantScreen/'+ this.restId);
            })
            .catch(err => console.log(err));
        },

        addOrUpdateEmployee: function(e) {
            e.preventDefault();
            if(this.isUpdate) {
                this.updateEmployee();
            }
            else this.addEmployee();
        }    
    },
    created() {
        console.log(this.empId);
        console.log(this.restId);

        this.buttonText = this.isUpdate ? 'Update' : 'Add';

        if(this.empId !== '' && this.empId !== 'none') {
            this.getEmployee();
        }
    }
}

</script>

<style>
.form-container{
    min-height: 100vh; 
}

.employees-box{
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

.employees-box .user-box{
  position: relative;
}

.employees-box .user-box input{
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

.employees-box .user-box label{
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
   box-shadow: none;
}

@media screen and (max-width: 800px){
    .employees-box{
    width: 70vh;
    max-width: 30rem;
    }
}

@media screen and (max-width: 600px){
    .employees-box{
    width: 50vh;
    max-width: 20rem;
    padding: 2rem;
    }
}

</style>