<template>
<div class="app-container"> 
    <ul >
        <li v-for="(net) in networks" :key="net.networkName">
        <span> <strong> Network Name: </strong></span>
        {{ net.networkName }}
        <span><strong> Number of hidden layers:</strong> </span>
        {{ net.numOfLayers}}
        <span><strong> Data size:</strong> </span>
        {{ net.dataSize}}
        <span><strong> Loss Function:</strong> </span>
        {{ net.lossFunction}}
        <v-btn  @click="onChoseNetwork(net)" text>Charge network</v-btn>
        </li>
    </ul>
</div>
</template>

<script>
import { EventBus } from "../main.js";
import { Network } from "../../TheNeuralLibrary/src/neuralNetwork/Network.js";
export default {
  name: "foundNetworks",

  methods: {
    async onChoseNetwork(choseNet){
      await this.netToCharge.buildCustomNeuralNetwork(
          choseNet.xTrain,
          choseNet.yTrain,
          choseNet.outputSize,
          choseNet.dataSize,
          choseNet.numOfLayers,
          choseNet.activationFunctions,
          choseNet.lossFunction,
          choseNet.neuronsPerLayer
        );
      console.log("net to charge")
      console.log(choseNet)
      console.log(this.netToCharge)
      console.log("net to charge")
      await this.$router.push({path: '/main'});
      await EventBus.$emit("giveNetwork", this.netToCharge);
    }
  },

  components: {
      
  },
  data() {
    return {
        networks: undefined,
        netToCharge: new Network()
    };
  },
  created(){
      EventBus.$on("foundNetworks", (data) => {
      this.networks = data;
    });
  }
  
};
</script>
<style>
  @import url("https://fonts.googleapis.com/css?family=Roboto|Material+Icons");
*,
*:before,
*:after {
  box-sizing: border-box;
}
main {
  font-family: "Roboto", "sans-serif";
  background: #fff top center repeat;
  color: #444;
}
h1,
p {
  margin: 0 0 1em 0;
}
.app-container {
  max-width: 100%;
  margin: 0 auto;
  /* background-color: #e8e8e8; */
  background-color: #fff;
}
</style>