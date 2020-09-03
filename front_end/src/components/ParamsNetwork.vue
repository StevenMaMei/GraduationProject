<template>
  <div>
    <hr />
    <label for="lossFunc">Loss Function: </label>
    <dropdown
      :options="allLossFunctions"
      :selected="network.lossFunction"
      v-on:updateOption="methodToRunOnSelectLoss"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>
    <label for="lossFunc">Ammount of layers: </label>
    <dropdown
      :options="layersArray"
      :selected="network.numberOfLayers"
      v-on:updateOption="methodToRunOnSelectNumber"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>

    <ParamsPerLayer></ParamsPerLayer>

    <hr />
  </div>
</template>


<script >
import dropdown from "vue-dropdowns"
import ParamsPerLayer from './ParamsPerLayer.vue'
import{ Network } from "../../TheNeuralLibrary/src/neuralNetwork/Network.js"


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
      net:Network,
      allLossFunctions: [],
      layersArray:null
    };
  },

  components: {
    dropdown: dropdown,
     ParamsPerLayer
  },
  created() {
    this.net=new Network();
   
    this.setLimimtArrays();

    this.allLossFunctions=this.net
      .getAllLossFunctions();

  },

  methods: {
    setLimimtArrays() {  
     this.layersArray=Array.from(Array(this.net.getMaxNumberOfLayers()), (_, i) => i + 1);
      },
    

    methodToRunOnSelectLoss(payload) {
      alert(payload);
      
      this.network.lossFunction = payload;
    },
    methodToRunOnSelectNumber(payload) {
      alert(payload);
      this.network.numberOfLayers=payload;
      
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