<template>
  <div>
    <hr />
    <label for="lossFunc">Loss Function: </label>
    <dropdown
      :options="allLossFunctions"
      :selected="network.lossFunction"
      v-on:updateOption="methodToRunOnSelect"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>
    <label for="lossFunc">Ammount of layers: </label>
    <dropdown
      :options="layersArray"
      :selected="network.numberOfLayers"
      v-on:updateOption="methodToRunOnSelect"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>

    <ParamsPerLayer></ParamsPerLayer>

    <hr />
  </div>
</template>


<script>
import dropdown from "vue-dropdowns"
import ParamsPerLayer from './ParamsPerLayer.vue'

export default {
   name: 'ParamsNetwork',
 
  data() {
    return {
      network: {
        actFunctions: [],
        numberOfLayers: "",
        lossFunction: "",
        neuronsPLayer: [],
      },
     
      allLossFunctions: [1, 2, 3, 4, 5],

      // esos valores toca pedirlos del backend
     
      maxNumberOfLayers: 10, 
      layersArray:null
    };
  },

  components: {
    dropdown: dropdown,
     ParamsPerLayer
  },
  created() {
    //pedir los maximos de cada vaina
    this.setLimimtArrays();

  },

  methods: {
    setLimimtArrays() {
      
     this.layersArray=Array.from(Array(this.maxNumberOfLayers), (_, i) => i + 1);



      },
    

    methodToRunOnSelect(payload) {
      alert(payload);
      this.network.lossFunction = payload;
    },
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>