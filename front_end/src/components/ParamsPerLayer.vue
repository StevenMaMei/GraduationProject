<template>
  <div>
    
    <label for="lossFunc">Activation Function: </label>
    <dropdown
      :options="allActFunctions"
      :selected="layer.actFunction"
      v-on:updateOption="methodToRunOnSelect"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>
    <label for="lossFunc">Ammount of neurons: </label>
    <dropdown
      :options="neuronsArray"
      :selected="layer.neurons"
      v-on:updateOption="methodToRunOnSelect"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>

   
  </div>
</template>


<script>
import dropdown from "vue-dropdowns";

export default {
   name: 'ParamsPerLayer',
   
  data() {
    return {
      layer: {
        actFunction: "",
        neurons: "",
      },
      // debe llegar del back
      allActFunctions: ["a", "b", "c", "d", "e"],
      

      // esos valores toca pedirlos del backend
      maxNumberOfNeurons: 6,
      neuronsArray:null,
      
    };
  },

  components: {
    dropdown: dropdown,
  },
  created() {
    //pedir los maximos de cada vaina
    this.setLimimtArrays();

  },

  methods: {
    setLimimtArrays() {
      
     this.neuronsArray=Array.from(Array(this.maxNumberOfNeurons), (_, i) => i + 1);



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