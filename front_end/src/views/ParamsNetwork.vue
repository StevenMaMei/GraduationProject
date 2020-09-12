<template>
  <div class="text-center margin">
    <!-- Loss function selection dropdown -->
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

    <!-- Number layers selection dropdown -->
    <v-menu>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              class="marginLeft"
              color="primary"
              dark
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            >{{selectedNumberOfLayers}}</v-btn>
          </template>
          <span>Number of layers</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in allNumberOfLayers"
          :key="index"
          @click="changeNumberOfLayers(item.title)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn class="marginLeft" @click="createNetwork()" rounded color="success" dark>Create Network</v-btn>
    
    <v-row>
      
    </v-row>
  </div>
</template>


<script >
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
      allNumberOfLayers: [],
      layersArray: null,
      selectedLossFunction: "Select the loss function",
      selectedNumberOfLayers: "Select the number of layers",
    };
  },

  components: {
  },
  created() {
    this.net = new Network();

    this.setLimimtArrays();

    let lf = this.net.getAllLossFunctions();
    lf.forEach((element) => {
      let lossF = { title: "" };
      lossF.title = element;
      this.allLossFunctions.push(lossF);
    });
  },

  methods: {
    setLimimtArrays() {
      this.layersArray = Array.from(
        Array(this.net.getMaxNumberOfLayers()),
        (_, i) => i + 1
      );
      this.layersArray.forEach((element) => {
        let numL = { title: "" };
        numL.title = element + "";
        this.allNumberOfLayers.push(numL);
      });
    },
    changeLossFunction(newLF) {
      this.selectedLossFunction = newLF;
    },
    changeNumberOfLayers(newNL) {
      this.selectedNumberOfLayers = newNL;
    },
    createNetwork() {
      if (
        this.selectedLossFunction != "Select the loss function" &&
        this.selectedNumberOfLayers != "Select the number of layers"
      ) {
        this.net = new Network();
        this.network.lossFunction = this.selectedLossFunction;
        this.network.numberOfLayers = parseInt(this.selectedNumberOfLayers);
        console.log(this.network.numberOfLayers);
        console.log(this.network.lossFunction);
        alert("New network created");
      } else {
        alert("Select all the parameters");
      }
    },
  },
};
</script>

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

.margin {
  margin: 2%;
}

.marginLeft {
  margin-left: 2%;
}
</style>