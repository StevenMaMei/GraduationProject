<template>
  <div class="row">
    <label for="actfunction">Activation Function:</label>
    <dropdown
      :options="allActFunctions"
      :selected="layer.actFunction"
      v-on:updateOption="methodToRunOnSelectActivation"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>
    <label for="lossFunc">Ammount of neurons:</label>
    <dropdown
      :options="neuronsArray"
      :selected="layer.neurons"
      v-on:updateOption="methodToRunOnSelectNumber"
      :placeholder="'Select an Item'"
      :closeOnOutsideClick="true"
    >></dropdown>

    <div class="col-md-12">
      <div class="row">
        <div class="col-md-4">
          <h4 class="card-title">Select ammount of neurons</h4>
          <el-select
            class="select-primary"
            size="large"
            placeholder="Amount of neurons"
            v-model="layer.neurons"
          >
            <el-option
              v-for="option in neuronsArray"
              class="select-primary"
              :value="option"
              :label="option"
              :key="option"
            ></el-option>
          </el-select>
        </div>

        <div class="col-md-6">
          <h4 class="card-title">Activation Function</h4>
          <el-select
            class="select-primary"
            size="large"
            placeholder="Select an actFunc"
            v-model="layer.actFunction"
          >
            <el-option
              v-for="option in allActFunctions"
              class="select-primary"
              :value="option"
              :label="option"
              :key="option"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>


<script >
import dropdown from "vue-dropdowns";
import { Network } from "../../TheNeuralLibrary/src/neuralNetwork/Network.js";

import { Select, Option } from "element-ui";

export default {
  name: "ParamsPerLayer",

  data() {
    return {
      layer: {
        actFunction: "",
        neurons: "",
      },
      // debe llegar del back
      allActFunctions: [],
      net: Network,

      // esos valores toca pedirlos del backend

      neuronsArray: null,
    };
  },

  components: {
    dropdown: dropdown,
    [Option.name]: Option,
    [Select.name]: Select,
  },
  created() {
    this.net = new Network();

    //pedir los maximos de cada vaina
    this.setLimimtArrays();
    this.allActFunctions = this.net.getAllActivationFunctions();
  },

  methods: {
    setLimimtArrays() {
      this.neuronsArray = Array.from(
        Array(this.net.getMaxNumberOfNeurons()),
        (_, i) => i + 1
      );
    },
    methodToRunOnSelectActivation(payload) {
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
<style>
.row .el-select {
  width: 100%;
  margin-bottom: 30px;
}
</style>