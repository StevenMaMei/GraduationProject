<template>
  <v-app>
    <main>
      <div class="app-container">
        <header class="app-header">
          <v-app-bar fixed dark color="#1D0664"  height="60">
            <v-toolbar-title >Neural Network</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-text-field dark v-model="searchEmail" label="Email of the user you want to search"></v-text-field>
            <v-btn dark  @click="searchNetworks" text>search</v-btn>
            <v-btn dark  @click="loginUser()" text>Login</v-btn>
            <v-btn dark to="/main" text>Main</v-btn>

          </v-app-bar>
        </header>
        <v-content>
          <router-view></router-view>
        </v-content>

        
      </div>
    </main>
  </v-app>
</template>

<script>
var axios = require("axios");
import { EventBus } from "./main.js";
export default {
  name: "App",

  components: {

  },

  methods: {
    loginUser(){
      EventBus.$emit("loginUser", "Open login dialog");
    },
    searchNetworks(){
      axios.get(`http://localhost:3000/neuralNetwork/${this.searchEmail}`)
        .then(async res=>{
          await this.$router.push({path:'/search'})
          EventBus.$emit("foundNetworks", res.data.networks);
        })
        .catch(err=>{
          alert(err.response.data.err.message)
        });
    }
  },

  data() {
    return {
      searchEmail: undefined
    };
  },
  created(){
    /* this.$router.push("/main"); */
  }
  
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto|Material+Icons");
*,
*:before,
*:after {
  box-sizing: border-box;
}

.botonBarra {
  color: #2d7c39;
}

body {
  margin: 0;
  padding: 0;
}

main {
  font-family: "Roboto", "sans-serif";
  background: #fff top center repeat;
  color: #444;
}

h1,
p {
  margin: 0 0 1em 0;
}

img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.app-container {
  max-width: 100%;
  margin: 0 auto;
  /* background-color: #e8e8e8; */
  background-color: #fff;
}

.app-container > * {
  border-radius: 5px;
  font-size: 150%;
  margin-bottom: 3%;
}

.app-header,
.app-footer {
  flex: 0 1 100%;
  text-align: center;
  /* background-color: #fff; */
  background-color: #ceded1;
}
</style>