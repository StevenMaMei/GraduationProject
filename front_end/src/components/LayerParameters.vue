<template>
  <v-card class="mx-auto margin" max-width="400">
    <v-card-text>
      <v-row align="center">
        <v-col class="display-1">Hidden layer number: {{layerIndex+1}}</v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-subtitle>Number of neurons:</v-list-item-subtitle>
    </v-list-item>

    <!-- Number of neurons slider selector -->
    <v-slider v-model="neuronsNumber" @change="changeNeurons()" :max="4" :tick-labels="labels" class="mx-4" ticks></v-slider>

    <v-list-item>
      <v-list-item-subtitle>Activation Function:</v-list-item-subtitle>
    </v-list-item>

    <!-- Activation function selection dropdown -->
    <v-menu>
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              class="marginB"
              color="primary"
              dark
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            >{{selectedActivationFunction}}</v-btn>
          </template>
          <span>Activation Function</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in allActivationFunctions"
          :key="index"
          @click="changeActivationFunction(item.title)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<script>
import { Network } from "../../TheNeuralLibrary/src/neuralNetwork/Network.js";
export default {
  props: {
    layer: {
      type: Object,
    },
  },
  data() {
    return {
      net: Network,
      layerIndex: undefined,
      neuronsNumber: 0,
      labels: null,
      selectedActivationFunction: "Select",
      allActivationFunctions: [],

      neuronsArray: null,
      maxNumber: 0,
    };
  },
  created() {
    this.layerIndex = this.layer.number;
    this.maxNumber = this.layer.maxNumberOfNuerons;
    this.setLimimtArrays();

    this.layer.activationF.forEach((element) => {
      let actF = { title: element };
      this.allActivationFunctions.push(actF);
    });
  },
  methods: {
    setLimimtArrays() {
      this.labels = Array.from(Array(this.maxNumber), (_, i) => i + 1);

      this.labels.forEach((element) => {
        let numL = { title: "" };
        numL.title = element + "";
        this.labels.push(numL);
      });
    },
    changeActivationFunction(actF) {
      this.selectedActivationFunction=actF;
      this.update(this.selectedActivationFunction, this.neuronsNumber);
    },
    changeNeurons() {
      
      this.update(this.selectedActivationFunction, this.neuronsNumber);
    },
    update(actF, neuronNumer) {
      this.$emit("updateMsg", actF, neuronNumer+1,this.layerIndex);
    },
  },
};
</script>


<style>
.margin {
  margin-top: 2%;
}
.marginB {
  margin-bottom: 2%;
}
</style>