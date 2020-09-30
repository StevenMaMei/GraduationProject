<template>
  <div>
    <h2 class="margin">Registration</h2>
    <form @submit.prevent="createUser">

      <v-text-field class="margin" v-model="firstName" label="First Name"></v-text-field>
      <v-text-field class="margin" v-model="lastName" label="Last Name"></v-text-field>


      <v-text-field class="margin" v-model="email" label="Email"></v-text-field>
      <v-text-field
        v-model="password"
        :type="'password'"
        label="Password"
        class="input-group--focused margin"
      ></v-text-field>

      

      <v-btn type="submit" color="green" class="margin">REGISTER</v-btn>
      <v-row class="margin"><p class="loginOption" >Already have an account? </p><router-link class="loginOption" to="/login"> Sign in here!</router-link></v-row>
    </form>
  </div>
</template>

<script>
/* import axios from '../plugins/axios' */
export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        edad: 0,
        
       
      }
     
    };
  },
  methods: {      
      createUser(){
          
      }
     
      
  } 
};
</script>

<style>
.margin {
  margin-top: 1%;
}
.loginOption{
  text-align: center;
  font-style: italic;
  font-size: medium;
  color: gray;
}

</style>