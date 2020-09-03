<template>
  <div>
    
    <label for="actfunction">Activation Function: </label>
    <dropdown
      :options="allActFunctions"
      :selected="layer.actFunction"
      v-on:updateOption="methodToRunOnSelectActivation"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>
    <label for="lossFunc">Ammount of neurons: </label>
    <dropdown
      :options="neuronsArray"
      :selected="layer.neurons"
      v-on:updateOption="methodToRunOnSelectNumber"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>

   
  </div>
</template>


<script>
import dropdown from "vue-dropdowns";
import Network  from 'front_end/TheNeuralLibrary/src/neuralNetwork/Network.ts'


export default {
   name: 'ParamsPerLayer',
   
  data() {
    return {
      layer: {
        actFunction: "",
        neurons: "",
      },
      // debe llegar del back
      allActFunctions: [],
      

      // esos valores toca pedirlos del backend
     
      neuronsArray:null,
      
    };
  },

  components: {
    dropdown: dropdown,
  },
  created() {
    //pedir los maximos de cada vaina
    this.setLimimtArrays();
    Network
      .getAllActivationFunctions()
      .then(x => (this.allActFunctions= x));

  },

  methods: {
    setLimimtArrays() {
      
     this.neuronsArray=Array.from(Array(Network.getMaxNumberOfNeurons()), (_, i) => i + 1);



      },
      methodToRunOnSelectActivation(payload){
         this.layer.actFunction = payload;
      },
    

    methodToRunOnSelectNumber(payload) {
      alert(payload);
      this.layers.neurons = payload;
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