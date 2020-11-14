<template>
  <v-app>
    <main>
      <div class="app-container">
        <header class="app-header">
          <v-app-bar fixed dark color="#1D0664" height="60">
            <v-toolbar-title>Neural Network</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn v-if="!userLogged" dark @click="loginUser()" text
              >Login</v-btn
            >
            <v-btn v-if="userLogged" dark @click="logout()" text
              ><v-icon dark right> mdi-logout</v-icon></v-btn
            >
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
import { EventBus } from "./main.js";
export default {
  name: "App",

  components: {},

  methods: {
    logout() {
      this.$cookie.delete("token");
      this.$cookie.delete("userEmail");
      this.userLogged = false;
      alert("You've logged out")
    },
    loginUser() {
      EventBus.$emit("loginUser", "Open login dialog");
    },
  },

  data() {
    return {
      userLogged: false,
      userName: undefined,
    };
  },
  created() {
    this.$router.push("/main");
    if (this.$cookie.get("userEmail")) {
      this.userLogged = true;
      this.userName = this.$cookie.get("userName");
    } else {
      this.userLogged = false;
    }

    EventBus.$on("changeToLogged", (msg) => {
      console.log(msg);
      this.userLogged = true;
    });
  },
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
  background-color: #fff;
}

.app-container > * {
  border-radius: 5px;
  font-size: 150%;
  margin-bottom: 3%;
}

.app-header {
  flex: 0 1 100%;
  text-align: center;
  background-color: #ceded1;
}
</style>