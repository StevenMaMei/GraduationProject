<template>
  <div class="text-center margin">
    <!-- Loss function selection dropdown -->

    <v-btn @click="changeCustomize()" class="margin-r" color="secondary" dark>{{
      customizationMsg
    }}</v-btn>

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

    <div v-if="customizingData">
      <div v-if="!customizingDataPoints">
        <v-row class="margin">
          <v-col>
            <v-text-field
              v-model="dataPointsNumber"
              label="Number of datapoints (1-16)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="inputSize"
              label="Input size (1-4)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="outputSize"
              label="Output size (1-2)"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <v-row class="margin">
        <v-btn
          v-if="!customizingDataPoints"
          @click="continueCustomizing()"
          rounded
          color="#4511E6"
          dark
          >Continue</v-btn
        >
        <v-btn
          v-if="customizingDataPoints"
          @click="finishCustom()"
          class="marginLeft"
          rounded
          color="success"
          dark
          >Finish Customization</v-btn
        >
        <v-btn
          v-if="customizingDataPoints"
          @click="backWithinCustoms()"
          class="marginLeft"
          rounded
          color="error"
          dark
          >Back</v-btn
        >
        <v-btn
          v-if="!customizingDataPoints"
          @click="cancelDataCustomization()"
          class="marginLeft"
          rounded
          color="error"
          dark
          >Cancel Customization</v-btn
        >
      </v-row>
      <div v-if="customizingDataPoints">
        <v-row
          align="center"
          align-content="center"
          v-for="dataP in customDataPoints"
          :key="dataP.index"
        >
          <v-col cols="12">
            <app-data-points
              @updateDP="receiverOfDataPoints"
              :dataPointInfo="dataP"
            ></app-data-points>
          </v-col>
        </v-row>
      </div>
    </div>
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
import DataPointsParams from "../components/DataPointParameters.vue";
import { EventBus } from "../main.js";
export default {
  name: "ParamsNetwork",
  components: {
    appLayers: LayerParams,
    appDataPoints: DataPointsParams,
  },

  data() {
    return {
      customizationMsg: "Customize Data",
      customData: false,
      alignment: "center",
      dataPointsX: [],
      dataPointsY: [],
      dataPointsNumber: undefined,
      inputSize: undefined,
      outputSize: undefined,
      customizingData: false,
      customizingDataPoints: false,
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
      customDataPoints: [],
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
    finishCustom() {
      let cond = false;
      this.dataPointsX.forEach((element) => {
        if (element == undefined) {
          cond = true;
        }
      });
      if (cond) {
        alert("Finish completing all the data");
      } else {
        alert("Data has been successfully customized!");
        this.customizationMsg = "Network data has been customized";
        this.customizingDataPoints = false;
        this.customizingData = false;
        this.customData = true;
      }
    },
    backWithinCustoms() {
      this.customizingDataPoints = false;
    },
    cancelDataCustomization() {
      this.customData = false;
      this.customizingDataPoints = false;
      this.customizingData = false;
      this.customDataPoints = [];
      this.dataPointsX = [];
      this.dataPointsY = [];
      this.dataPointsNumber = undefined;
      this.inputSize = undefined;
      this.outputSize = undefined;
    },
    continueCustomizing() {
      this.dataPointsNumber = parseInt(this.dataPointsNumber, 10);
      this.inputSize = parseInt(this.inputSize, 10);
      this.outputSize = parseInt(this.outputSize, 10);

      if (
        this.dataPointsNumber == undefined ||
        this.inputSize == undefined ||
        this.outputSize == undefined
      ) {
        alert("Complete all the values");
      } else if (
        !Number.isInteger(this.dataPointsNumber) ||
        !Number.isInteger(this.inputSize) ||
        !Number.isInteger(this.outputSize)
      ) {
        alert("All fields must be integer numbers");
        this.dataPointsNumber = undefined;
        this.inputSize = undefined;
        this.outputSize = undefined;
      } else if (this.dataPointsNumber < 1 || this.dataPointsNumber > 16) {
        alert("The number of data points must be between 1 and 16");
      } else if (this.inputSize < 1 || this.inputSize > 4) {
        alert("The input size must be between 1 and 4");
      } else if (this.outputSize < 1 || this.outputSize > 2) {
        alert("The output size must be between 1 and 2");
      } else {
        this.customizingDataPoints = true;
        this.customDataPoints = [];
        this.dataPointsX = [];
        this.dataPointsY = [];
        for (let i = 0; i < this.dataPointsNumber; i++) {
          let obj = {
            inputSize: this.inputSize,
            outputSize: this.outputSize,
            index: i,
          };
          this.customDataPoints.push(obj);
          this.dataPointsX.push(undefined);
          this.dataPointsY.push(undefined);
        }
      }
    },
    changeCustomize() {
      this.customizingData = !this.customizingData;
    },
    resetNetwork() {
      this.net = new Network();
      EventBus.$emit("resetNetwork", "network will be reseted");
      (this.selectedLossFunction = "Select the loss function"),
        (this.selectedNumberOfLayers = "Select the number of hidden layers"),
        (this.resetAvailable = false);
      this.createAvailable = true;
      this.customData = false;
      this.customizingDataPoints = false;
      this.customizingData = false;
      this.customDataPoints = [];
      this.dataPointsX = [];
      this.dataPointsY = [];
      this.dataPointsNumber = undefined;
      this.inputSize = undefined;
      this.outputSize = undefined;
    },
    receiverOfDataPoints(xDP, yDP, indexDP) {
      this.dataPointsX[indexDP] = xDP;
      this.dataPointsY[indexDP] = yDP;
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
      let layersNueorns = new Array();
      let layersFunctions = new Array();

      this.layerAtributes.forEach((x) => {
        layersNueorns.push(x.neuronNumber);
        layersFunctions.push(x.actFF);
      });
      if (this.customData) {
        this.net.buildCustomNeuralNetwork(
          this.dataPointsX,
          this.dataPointsY,
          this.outputSize,
          this.inputSize,
          this.selectedNumberOfLayers,
          layersFunctions,
          this.selectedLossFunction,
          layersNueorns
        );
      } else {
        let x_train = [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
        ];
        let y_train = [[0], [1], [1], [0]];
        this.net.buildCustomNeuralNetwork(
          x_train,
          y_train,
          1,
          2,
          this.selectedNumberOfLayers,
          layersFunctions,
          this.selectedLossFunction,
          layersNueorns
        );
      }

      this.emitGlobalClickEvent();
      alert("Network has been parametrized");
      this.ready = false;
      this.resetAvailable = true;
      this.layers = [];
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
      if (!this.customizingData) {
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
      }else{
        alert("Finish or cancel data customization")
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

.margin-r {
  margin-right: 2%;
}
.center {
  text-align: center;
}
</style>