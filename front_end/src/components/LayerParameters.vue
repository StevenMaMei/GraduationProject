<template>
  <v-card class="mx-auto margin" max-width="400">
    

    <v-card-text>
      <v-row align="center">
        <v-col class="display-1" >Layer number: {{layerIndex+1}}</v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-subtitle>Number of neurons:</v-list-item-subtitle>
    </v-list-item>

    <!-- Number of neurons slider selector -->
    <v-slider v-model="neuronsNumber" :max="7" :tick-labels="labels" class="mx-4" ticks></v-slider>


    <v-list-item>
      <v-list-item-subtitle>Activation Function:</v-list-item-subtitle>
    </v-list-item>

    <!-- Activation function selection dropdown -->
    <v-menu >
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn class="marginB"
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

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text>Set Layer</v-btn>
    </v-card-actions>
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
      labels: [1, 2,3,4,5,6,7,8],
      selectedActivationFunction: "Select",
      allActivationFunctions: [],
      
    };
  },
  created() {
    this.layerIndex = this.layer.number;
    this.layer.activationF.forEach(element => {
        let actF = {title: element}
        this.allActivationFunctions.push(actF)
    });
    console.log(this.allActivationFunctions)
  },
  methods: {
      changeActivationFunction(actF){
          console.log(actF)
      }
  }
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