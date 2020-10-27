<template>
<div class="app-container"> 
    <ul >
        <li class="netInfo" v-for="(net) in networks" :key="net.networkName">
        <p> <strong> Network Name: </strong></p>
        {{ net.networkName }}
        <p><strong> Number of hidden layers:</strong> </p>
        {{ net.numOfLayers}}
        <p><strong> Data size:</strong> </p>
        {{ net.dataSize}}
        <p><strong> Loss Function:</strong> </p>
        {{ net.lossFunction}}<br>
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
.netInfo {
  width: 45%;
  font-size: 20px;
  display: inline-block;
  border-width: 0.5px;
  text-align: center;
  background: #FBFBFB;
  border-radius: 10px;
  margin: 5px;
}
.netInfo button{
  border-style: solid;
  color: white;
  margin: 5px;
}
main {
  font-family: "Roboto", "sans-serif";
  background: #fff top center repeat;
  color: #444;
}
ul {
  display: inline-block;
}
h1,
p {
  margin: 0 0 1em 0;
}
.app-container {
  max-width: 100%;
  text-align: center;
  margin: 0 auto;
  /* background-color: #e8e8e8; */
  background-color: #fff;
}
</style>