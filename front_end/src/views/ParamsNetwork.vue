<template>
  <!-- <div>
    <v-container>
      <hr />
      <label for="lossFunc">Loss Function:</label>
      <dropdown
        :options="allLossFunctions"
        :selected="network.lossFunction"
        v-on:updateOption="methodToRunOnSelectLoss"
        :placeholder="'Select an Item'"
        :closeOnOutsideClick="true"
      >></dropdown>
      <label for="lossFunc">Ammount of layers:</label>
      <dropdown
        :options="layersArray"
        :selected="network.numberOfLayers"
        v-on:updateOption="methodToRunOnSelectNumber"
        :placeholder="'Select an Item'"
        :closeOnOutsideClick="true"
      >></dropdown>

      <ParamsPerLayer></ParamsPerLayer>

      <hr />
    </v-container>
  </div> -->
  <div class="text-center margen">
    <v-menu>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            >{{selectedLossFunction}}</v-btn>
          </template>
          <span>Loss Function</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in allLossFunctions"
          :key="index"
          @click="changeLossFunction(item.title)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>


<script >
//import dropdown from "vue-dropdowns";
//import ParamsPerLayer from "./ParamsPerLayer.vue";
import { Network } from "../../TheNeuralLibrary/src/neuralNetwork/Network.js";

export default {
  name: "ParamsNetwork",

  data() {
    return {
      network: {
        actFunctions: [],
        numberOfLayers: "",
        lossFunction: "",
        neuronsPLayer: [],
      },
      net: Network,
      allLossFunctions: [],
      layersArray: null,
      selectedLossFunction: "Select the loss function",
      
      
    };
  },

  components: {
    //dropdown: dropdown,
    //ParamsPerLayer,
  },
  created() {
    this.net = new Network();

    this.setLimimtArrays();

    let lf = this.net.getAllLossFunctions();
    lf.forEach(element => {
      let lossF = {title:""};
      lossF.title = element
      this.allLossFunctions.push(lossF)
    });
  },

  methods: {
    setLimimtArrays() {
      this.layersArray = Array.from(
        Array(this.net.getMaxNumberOfLayers()),
        (_, i) => i + 1
      );
    },
    changeLossFunction(newLF){
      this.selectedLossFunction = newLF;
      this.network.lossFunction = this.selectedLossFunction;
      console.log(this.network.lossFunction)
     
    },
    
    methodToRunOnSelectNumber(payload) {
      alert(payload);
      this.network.numberOfLayers = payload;
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

.margen{
  margin: 2%
}
</style>