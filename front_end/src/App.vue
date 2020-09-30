<template>
  <v-app>
    <main>
      <div class="app-container">
        <header class="app-header">
          <v-app-bar color="#9CCC65" fixed=true height="40">
            <!-- <v-img class="mx-2" src="./images/castor.png" max-height="40" max-width="41" contain></v-img> -->
            <v-toolbar-title >Neural Network</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- <v-btn v-if="this.sesionIniciada == false" to="/iniciarSesion">Iniciar Sesion</v-btn>
            <v-btn v-if="this.sesionIniciada == false" to="/registro">Registro</v-btn> -->

            <v-btn  to="/login" text>Login</v-btn>
            <v-btn to="/main" text>Main</v-btn>

            <!-- <v-btn icon v-if="this.sesionIniciada == true" @click="cerrarSesion">
              <v-icon>mdi-export</v-icon>
            </v-btn> -->
          </v-app-bar>
        </header>
        <v-content>
          <router-view></router-view>
        </v-content>

        <!-- <v-footer v-if="this.sesionIniciada == true" padless>
          <v-row justify="center" no-gutters>
            <v-btn
              color="gray"
              text
              rounded
              class="my-2"
              to="/proyectos"
            >PROYECTOS</v-btn>
            <v-btn
              color="gray"
              text
              rounded
              class="my-2"
              to="/acercaDe"
            >ACERCA DE NOSOTROS</v-btn>
            <v-col class=" py-4 text-center gray--text" cols="12">
              {{ new Date().getFullYear() }} —
              <strong>FUNDI</strong>
            </v-col>
          </v-row>
        </v-footer> -->
      </div>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {

  },

  data() {
    return {
      
    };
  },
  created(){
    this.$router.push("/main");
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