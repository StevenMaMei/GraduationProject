<template>
  <div class="margin">
    <h2 class="title">LOGIN</h2>
    <v-text-field outlined v-model="email" label="Email"></v-text-field>
    <v-text-field outlined v-model="password" :type="'password'" label="Password"></v-text-field>
    <v-row><p class="registerOption" >Not registered yet? </p><router-link class="registerOption" to="/register"> Sign up here!</router-link></v-row>
    <center><v-btn @click="login" type="submit" color="#A51F1F" dark class="title" width=100% >ENTER</v-btn></center>
  </div>
</template>

<script>
/* import axios from "../plugins/axios"; */
export default {
  data() {
    return {
      email: "",
      password: "",
      respuesta: false,
      /* rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      } */
    };
  },
  methods: {
    login(){
        
    }
    
  }
};
</script>

<style>

.registerOption{
  text-align: center;
  font-style: italic;
  font-size: medium;
  color: gray;
}

.margin {
  margin-left: 20%;
  margin-right: 20%;
}
.page {
  position: fixed;
  width: inherit;
}
.title {
  margin-top: 10%;
  text-align: center;
  margin-bottom: 5%;
}
</style>