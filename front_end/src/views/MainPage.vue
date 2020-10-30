<template>
  <v-app>
    <main>
      <Network/>
      <ParamsNetwork />
    </main>
  </v-app>
</template>

<script>
import Network from "./Network"; 
import ParamsNetwork from "./ParamsNetwork";
export default {
  name: "Main",
  components: {
    Network,
    ParamsNetwork
  },
  data() {
    return {
    };
  },
  created(){
    
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
main {
  font-family: "Roboto", "sans-serif";
  background: #fff top center repeat;
  color: #444;
}
h1,
p {
  margin: 0 0 1em 0;
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
img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}
</style>