<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      
    </v-app-bar>

    <v-main>
     <Network/>
     <hr>  
     <ParamsNetwork/>
    </v-main>
  </v-app>
</template>

<script>
import Network from './components/Network';
import ParamsNetwork from './components/ParamsNetwork';
export default {
  name: 'App',

  components: {
    Network,
    ParamsNetwork
  },

  data: () => ({
    //
  }),
};
</script>
