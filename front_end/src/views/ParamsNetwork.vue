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
              >{{ selectedLossFunction }}</v-btn
            >
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
              >{{ selectedNumberOfLayers }}</v-btn
            >
          </template>
          <span>Number of hidden layers</span>
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

    <v-btn
      v-if="createAvailable"
      class="marginLeft"
      @click="createNetwork()"
      rounded
      color="success"
      dark
      >Create Network</v-btn
    >
    <v-btn
      v-if="ready"
      class="marginLeft"
      @click="generateNetwork()"
      rounded
      color="success"
      dark
      >Go</v-btn
    >

    <v-btn
      v-if="resetAvailable"
      class="marginLeft"
      @click="resetNetwork()"
      rounded
      color="error"
      dark
      >Reset Network</v-btn
    >

    <v-row>
      <v-col v-for="layerP in layers" :key="layerP.number" cols="12" md="4">
        <app-layers @updateMsg="reciever" :layer="layerP"></app-layers>
      </v-col>
    </v-row>
  </div>
</template>


<script >
import { Network } from "../../TheNeuralLibrary/src/neuralNetwork/Network.js";
import LayerParams from "../components/LayerParameters.vue";
import { EventBus } from "../main.js";
export default {
  name: "ParamsNetwork",
  components: {
    appLayers: LayerParams,
  },

  data() {
    return {
      resetAvailable: false,
      createAvailable: true,
      network: {
        actFunctions: [],
        numberOfLayers: "",
        lossFunction: "",
        neuronsPLayer: [],
      },
      layerAtributes: [],
      ready: false,
      net: Network,
      allLossFunctions: [],
      allNumberOfLayers: [],
      layersArray: null,
      maxNumbOfNeurons: 0,
      selectedLossFunction: "Select the loss function",
      selectedNumberOfLayers: "Select the number of hidden layers",

      layers: [],
      allActivationFunctions: [],
    };
  },

  created() {
    this.net = new Network();

    this.setLimimtArrays();

    this.allActivationFunctions = this.net.getAllActivationFunctions();

    this.maxNumbOfNeurons = this.net.getMaxNumberOfNeurons();

    let lf = this.net.getAllLossFunctions();
    lf.forEach((element) => {
      let lossF = { title: "" };
      lossF.title = element;
      this.allLossFunctions.push(lossF);
    });
  },

  methods: {
    resetNetwork(){
      this.net = new Network();
      EventBus.$emit("resetNetwork", "network will be reseted");
      this.selectedLossFunction= "Select the loss function",
      this.selectedNumberOfLayers= "Select the number of hidden layers",
      this.resetAvailable = false;
      this.createAvailable = true;
      
    },
    reciever(actF, neuronNumer, layerId) {
      let encontro = false;
      this.layerAtributes.forEach((e) => {
        if (e.layerIdd === layerId) {
          e.actFF = actF;
          e.neuronNumber = neuronNumer;
          encontro = true;
        }
      });
      if (encontro == false) {
        let aux = {
          actFF: actF,
          neuronNumber: neuronNumer,
          layerIdd: layerId,
        };
        this.layerAtributes.push(aux);
      }
    },
    generateNetwork() {
      /* console.log(this.layerAtributes[0].actFF) */
      /* EventBus.$emit("resetNetwork", true); */
      let layersNueorns = new Array();
      let layersFunctions = new Array();

      this.layerAtributes.forEach((x) => {
        layersNueorns.push(x.neuronNumber);
        layersFunctions.push(x.actFF);
      });

      this.net.buildCustomNeuralNetwork(
        2,
        this.selectedNumberOfLayers,
        layersFunctions,
        this.selectedLossFunction,
        layersNueorns
      );
      this.emitGlobalClickEvent()
      alert("Network has been parametrized")
      this.ready = false;
      this.resetAvailable = true;
      this.layers= [];
      
    },
    emitGlobalClickEvent() {
      EventBus.$emit("giveNetwork", this.net);
    },
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
      this.ready = true;
      if (
        this.selectedLossFunction != "Select the loss function" &&
        this.selectedNumberOfLayers != "Select the number of layers"
      ) {
        this.net = new Network();
        this.network.lossFunction = this.selectedLossFunction;
        this.network.numberOfLayers = parseInt(this.selectedNumberOfLayers);
        this.layers = [];
        alert("New network created");
        for (var i = 0; i < this.network.numberOfLayers; i++) {
          let layer = {
            number: i,
            activationF: this.allActivationFunctions,
            maxNumberOfNuerons: this.maxNumbOfNeurons,
          };
          this.layers.push(layer);
        }
      } else {
        alert("Select all the parameters");
      }
      this.createAvailable = false;
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