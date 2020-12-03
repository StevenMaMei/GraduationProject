<template>
  <div>
    <div v-if="configMenu">
      <div v-if="show" class="text-center margin">
        <h2 class="margin-b">Network configuration menu</h2>
        <p class="margin-b" v-if="ready">
          Hidden Layers: {{ selectedNumberOfLayers }} --- Loss Function:
          {{ selectedLossFunction }}
        </p>

        <v-container>
          <v-row v-if="!ready" class="rowMargins">
            <v-col>
              <p>Loss Function</p>
            </v-col>
            <v-col>
              <!-- Loss function dropdown -->
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        color="#1D0664"
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
            </v-col>
          </v-row>

          <v-row v-if="!ready" class="rowMargins">
            <v-col>
              <p>Number of hidden layers</p>
            </v-col>
            <v-col>
              <!-- Number of layers dropdown -->
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="marginLeft"
                        color="#1D0664"
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
            </v-col>
          </v-row>

          <!-- data information -->
          <v-row v-if="!ready" class="rowMargins">
            <v-col>
              <p>{{ networkDataMsg }}</p>
            </v-col>
            <v-col>
              <v-row>
                <p>X: {{ xData }}</p>
              </v-row>
              <v-row>
                <p>Y: {{ yData }}</p>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="rowMargins margin-t">
            <v-col v-if="!ready">
              <v-btn @click="changeCustomize()" color="secondary" dark>{{
                customizationMsg
              }}</v-btn>
            </v-col>
            <v-col v-if="createAvailable">
              <v-btn @click="createNetwork()" rounded color="#0DBD47" dark
                >Create Network</v-btn
              >
            </v-col>
            <v-col v-if="createAvailable">
              <v-btn
                @click="userEmailDialog = true"
                rounded
                color="#1D0664"
                dark
                >Upload Network<v-icon dark right>
                  mdi-cloud-upload</v-icon
                ></v-btn
              >
              <v-dialog v-model="userEmailDialog" persistent max-width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">User's email</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="*Email"
                            required
                            v-model="userEmail"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="userEmailDialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="searchNetworks()">
                      Go
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col v-if="ready">
              <v-btn @click="backToBeginning()" rounded color="#E62111" dark
                >Back</v-btn
              >
            </v-col>
            <v-col v-if="ready">
              <v-btn @click="generateNetwork()" rounded color="#0DBD47" dark
                >Finish</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </div>

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
            color="#0DBD47"
            dark
            >Finish Customization</v-btn
          >
          <v-btn
            v-if="customizingDataPoints"
            @click="backWithinCustoms()"
            class="marginLeft"
            rounded
            color="#E62111"
            dark
            >Back</v-btn
          >

          <v-btn
            v-if="!customizingDataPoints"
            @click="cancelDataCustomization()"
            class="marginLeft"
            rounded
            color="#E62111"
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

      <v-row class="margin-t">
        <v-col v-for="layerP in layers" :key="layerP.number">
          <app-layers @updateMsg="reciever" :layer="layerP"></app-layers>
        </v-col>
      </v-row>
    </div>

    <!-- networks found -->

    <div class="text-center" v-if="networksFoundMenu">
      <h2 class="margin-b">Networks found</h2>
      <v-btn
        class="margin-b"
        @click="closeNetworksFound()"
        rounded
        color="#E62111"
        dark
        >Clear</v-btn
      >
      <ul>
        <li class="netInfo" v-for="net in networks" :key="net.networkName">
          <p><strong> Network Name: </strong> {{ net.networkName }}</p>

          <p>
            <strong> Number of hidden layers:</strong> {{ net.numOfLayers }}
          </p>

          <p><strong> Data size:</strong> {{ net.dataSize }}</p>

          <p><strong> Loss Function:</strong> {{ net.lossFunction }}</p>
          <br />
          <v-btn color="#1D0664" @click="onChoseNetwork(net)"
            >Charge network</v-btn
          >
        </li>
      </ul>
    </div>

    <v-dialog v-model="dataCustomDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Data has alreay been customized
        </v-card-title>
        <v-card-text>Do you wish to delete your custom data?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="resetCustomData()">
            Yes
          </v-btn>
          <v-btn color="green darken-1" text @click="dataCustomDialog = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script >
import { Network } from "../../TheNeuralLibrary/src/neuralNetwork/Network.js";
import LayerParams from "../components/LayerParameters.vue";
import DataPointsParams from "../components/DataPointParameters.vue";
import { EventBus } from "../main.js";
var axios = require("axios");
export default {
  name: "ParamsNetwork",
  components: {
    appLayers: LayerParams,
    appDataPoints: DataPointsParams,
  },

  data() {
    return {
      networkDataMsg: "Default Data",
      xData: "(0,0) (0,1) (1,0) (1,1)",
      yData: "(0) (1) (1) (0)",
      dataCustomDialog: false,

      networks: undefined,
      netToCharge: new Network(),
      networksFoundMenu: false,
      configMenu: true,

      userEmailDialog: false,
      userEmail: undefined,
      show: true,
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
    EventBus.$on("resetNetwork", (msg) => {
      console.log(msg);
      this.show = true;
      this.layers = [];
      this.layersArray = null;

      this.net = new Network();

      (this.selectedLossFunction = "Select the loss function"),
        (this.selectedNumberOfLayers = "Select the number of hidden layers"),
        (this.createAvailable = true);
      this.customData = false;
      this.customizingDataPoints = false;
      this.customizingData = false;
      this.customDataPoints = [];
      this.dataPointsX = [];
      this.dataPointsY = [];
      this.dataPointsNumber = undefined;
      this.inputSize = undefined;
      this.outputSize = undefined;
      this.networkDataMsg = "Default Data";
      this.xData = "(0,0) (0,1) (1,0) (1,1)";
      this.yData = "(0) (1) (1) (0)";
    });

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
    resetCustomData() {
      this.customizationMsg = "Customize Data";
      this.customizingDataPoints = false;
      this.customizingData = false;
      this.customData = true;
      this.dataPointsX = [];
      this.dataPointsY = [];
      this.customDataPoints = [];
      this.dataPointsNumber = undefined;
      this.inputSize = undefined;
      this.outputSize = undefined;
      this.dataCustomDialog = false;
      this.networkDataMsg = "Default Data";
      this.xData = "(0,0) (0,1) (1,0) (1,1)";
      this.yData = "(0) (1) (1) (0)";
    },
    closeNetworksFound() {
      this.configMenu = true;
      this.networksFoundMenu = false;
      this.networks = undefined;
    },
    async onChoseNetwork(choseNet) {
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
      this.customizationMsg = "Customize Data";
      this.configMenu = true;
      this.networksFoundMenu = false;
      this.networks = undefined;
      this.ready = false;
      this.show = false;
      this.layers = [];

      await alert("Network uploaded");
      await EventBus.$emit("giveNetwork", this.netToCharge);
    },
    searchNetworks() {
      axios
        .get(`http://localhost:3000/neuralNetwork/${this.userEmail}`)
        .then(async (res) => {
          this.networks = res.data.networks;
          this.networksFoundMenu = true;
          this.configMenu = false;
          this.userEmailDialog = false;
        })
        .catch((err) => {
          alert(err.response.data.err.message);
        });
    },
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
        this.customizationMsg = "Data Customized";
        this.customizingDataPoints = false;
        this.customizingData = false;
        this.customData = true;
        this.networkDataMsg = "Custom Data";
        let newXData = "";
        let newYData = "";
        for (let i = 0; i < this.dataPointsX.length; i++) {
          let currentX = "(" + this.dataPointsX[i] + ") ";
          let currentY = "(" + this.dataPointsY[i] + ") ";
          newXData += currentX;
          newYData += currentY;
        }
        this.xData = newXData;
        this.yData = newYData;
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
      if (this.customizationMsg == "Data Customized") {
        this.dataCustomDialog = true;
      } else {
        this.customizingData = !this.customizingData;
      }
    },
    receiverOfDataPoints(xDP, yDP, indexDP) {
      this.dataPointsX[indexDP] = xDP;
      this.dataPointsY[indexDP] = yDP;
    },
    reciever(actF, neuronNumer, layerId) {
      this.layerAtributes[layerId] = {
        actFF: actF,
        neuronNumber: neuronNumer,
        layerIdd: layerId,
      };
    },
    generateNetwork() {
      this.customizationMsg = "Customize Data";
      let layersNueorns = [];
      let layersFunctions = [];

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
        if ((this.selectedLossFunction == "Binary Cross Entropy")) {
          //in each y data point, the left number represents the probability of 0 and the right number represents the probability of 1
          let y_train = [
            [1, 0],
            [0, 1],
            [0, 1],
            [1, 0],
          ];
          this.net.buildCustomNeuralNetwork(
            x_train,
            y_train,
            2,
            2,
            this.selectedNumberOfLayers,
            layersFunctions,
            this.selectedLossFunction,
            layersNueorns
          );
        } else {
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
      }

      this.layerAtributes = [];
      this.ready = false;
      this.show = false;
      this.layers = [];
      this.layersArray = [];
      this.emitGlobalClickEvent();
      alert("Network has been parametrized");
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
    backToBeginning() {
      this.net = new Network();
      this.selectedLossFunction = "Select the loss function";
      this.selectedNumberOfLayers = "Select the number of layers";
      this.layers = [];
      this.ready = false;
      this.createAvailable = true;
    },
    createNetwork() {
      if (!this.customizingData) {
        if (
          this.selectedLossFunction != "Select the loss function" &&
          this.selectedNumberOfLayers != "Select the number of layers"
        ) {
          this.ready = true;
          this.createAvailable = false;
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
      } else {
        alert("Finish or cancel data customization");
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
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
.margin-b {
  margin-bottom: 2%;
}
.center {
  text-align: center;
}
.margin-t {
  margin-top: 2%;
}
.rowMargins {
  margin-left: 20%;
  margin-right: 20%;
}
.netInfo {
  width: 30%;
  font-size: 20px;
  display: inline-block;
  border-width: 0.5px;
  border-color: black;
  text-align: center;
  background: #fbfbfb;
  border-radius: 10px;
  margin: 3%;
}
.netInfo button {
  border-style: solid;
  color: white;
  margin: 5px;
}
</style>