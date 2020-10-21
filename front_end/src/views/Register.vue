<template>
  <div>
    <h2 class="margin">Registration</h2>
    <form @submit.prevent="createUser">

      <v-text-field class="margin" v-model="name" label="Name"></v-text-field>


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
var axios = require("axios");

export default {
  data() {
    return {

      name: "",
      password: "",
      email: ""
    };
  },
  methods: {      
      createUser(){
          console.log(this.name)
          
          axios.post('http://localhost:3000/register',{
            ok: true,
            user: {
              name: this.name,
              email: this.email,
              password: this.password
            }
          }).then(res=>{
            res
            alert("User created")
          })
          .catch(err=>{
            console.log(err.response)
            alert(err.response.data.message)
          });
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