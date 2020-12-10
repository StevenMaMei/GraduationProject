<template>
  <div class="force-base-ii">
    <div v-if="networkStarted">
      <v-container>
        <div class="margin-top">
          <!-- FIRST LINE WITH NETWORK INFORMATION -->

          <v-row no-gutters class="row-margins-lbls">
            <v-col class="text-center">
              Layer Number: {{ currentLayer }}
            </v-col>
            <v-col class="text-center"> Epoch Number: {{ epoch }} </v-col>
            <v-col class="text-center">
              {{ typeOfProp }}
            </v-col>
          </v-row>

          <!-- SECOND LINE WITH NETWORK OPTIONS (BUTTONS) -->

          <v-row no-gutters class="row-margins-btns">
            <!-- this button advances the network one layer -->
            <v-col class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn @click="nextLayer()" dark rounded color="#EFB810"
                      ><v-icon dark>mdi-fast-forward</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Next Layer</span>
              </v-tooltip>
            </v-col>

            <!-- this button advances the network one epoch -->
            <v-col class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn @click="nextEpoch()" dark rounded color="#EFB810"
                      ><v-icon dark>mdi-skip-next</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Next Epoch</span>
              </v-tooltip>
            </v-col>

            <!-- this option opens a dialog for you to specify to which epoch you want to move your network forward -->
            <v-col class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn
                      @click="epochsDialog = true"
                      dark
                      rounded
                      color="#EFB810"
                      ><v-icon dark>mdi-skip-next</v-icon
                      ><v-icon dark>mdi-skip-next</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Go to specific Epoch</span>
              </v-tooltip>
              <v-dialog v-model="epochsDialog" persistent max-width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline"
                      >To what epoch do you wish to advance?</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Target epoch"
                            required
                            v-model="epochNumber"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>Current epoch: {{ epoch }}</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="epochsDialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="goToEpoch()">
                      Go
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>

            <!-- this button stops the network and returns it to 0, which means epoch 1 layer 1 -->
            <v-col class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn @click="stopNetwork()" dark rounded color="#EFB810"
                      ><v-icon dark>mdi-stop</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Stop Network</span>
              </v-tooltip>
            </v-col>

            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-spacer></v-spacer>

            <!-- this option first verifies that you are logged in and then opens a dialog for you to give your network a name and then save it -->
            <v-col class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn @click="verifyLogin()" dark rounded color="#1D0664"
                      ><v-icon dark>mdi-content-save</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Save Network</span>
              </v-tooltip>
              <v-dialog
                v-model="saveNetworkDialog"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title>
                    <span class="headline"
                      >Please enter the name of your Neural Network</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="*Name"
                            required
                            v-model="networkName"
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
                      @click="saveNetworkDialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="saveNetwork">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>

            <!-- this option opens up a table where you can see all the training data of your network with all of its specific parameters -->
            <v-col class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn
                      @click="viewDataDialog = true"
                      dark
                      rounded
                      color="#1D0664"
                      ><v-icon dark>mdi-database</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Show data and network details</span>
              </v-tooltip>
              <v-dialog v-model="viewDataDialog" persistent max-width="600">
                <v-card>
                  <v-card-title class="headline">
                    This is your Neural network's information
                  </v-card-title>
                  <v-card-text>
                    Total amount of layers: {{ net.layers.length / 2 + 1 }}
                  </v-card-text>
                  <v-card-text>
                    Amount of hidden layers: {{ net.layers.length / 2 - 1 }}
                  </v-card-text>
                  <v-card-text>
                    Network's loss function: {{ net.lossFunc }}
                  </v-card-text>
                  <v-card-text>
                    Network's training data (X): {{ xDataInfo }}
                  </v-card-text>
                  <v-card-text>
                    Network's training data (Y): {{ yDataInfo }}
                  </v-card-text>
                  <v-row>
                    <v-col>
                      <v-card-text>
                        Network's Activation functions:
                      </v-card-text>
                    </v-col>
                    <v-col>
                      <v-row
                        v-for="layerAct in layersActFuncInfo"
                        :key="layerAct.index"
                      >
                        <v-card-text>{{ layerAct.func }}</v-card-text>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="viewDataDialog = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>

            <!-- this option resets completly the network, all of its parameters and data, and then takes you to the config menu again. It asks you for a confirmation first -->
            <v-col class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <v-btn
                      @click="resetConfirmationDialog = true"
                      dark
                      rounded
                      color="#E62111"
                      ><v-icon dark>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Reset Network</span>
              </v-tooltip>
              <v-dialog
                v-model="resetConfirmationDialog"
                persistent
                max-width="290px"
              >
                <v-card>
                  <v-card-title class="headline">
                    Are you sure you want to reset your network?
                  </v-card-title>
                  <v-card-text
                    >This will completly reset your network and take you back to
                    the Network configuration menu.</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="resetConfirmationDialog = false"
                    >
                      No
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="resetNetwork()">
                      Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>

    <!-- THIS IS THE LOGIN DIALOG -->
    <v-dialog v-model="loginDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="*Email"
                  required
                  v-model="email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :type="'password'"
                  label="*Password"
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="openRegistration()">
            Registration
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#E62111" text @click="loginDialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="login()"> Enter </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- THIS IS THE REGISTRATION DIALOG -->
    <v-dialog v-model="registrationDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Registration</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="*Email"
                  required
                  v-model="email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="*Password"
                  required
                  :type="'password'"
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="*Name"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="openLogin()"> Login </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#E62111" text @click="registrationDialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="register()"> Enter </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <hr />

    <div class="marginNetwork"></div>

    <!-- THIS IS THE NETWORK VISUALIZATION -->
    <svg id="viz" class="container-border"></svg>

    <v-col cols="12">
      <v-row v-for="line in steps" :key="line.index">
        <v-card-text align="center">{{ line }}</v-card-text>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { Network } from "../../TheNeuralLibrary/src/neuralNetwork/Network.js";
import * as d3 from "d3";
import { EventBus } from "../main.js";
var axios = require("axios");
export default {
  name: "Network",
  components: {},
  data() {
    return {
      //dialog toggles

      loginDialog: false,
      registrationDialog: false,
      resetConfirmationDialog: false,
      saveNetworkDialog: false,
      epochsDialog: false,
      viewDataDialog: false,

      //----------------

      //fields used in registration and login

      email: "",
      password: "",
      name: "",

      //-------------

      xDataInfo: "",
      yDataInfo: "",
      layersActFuncInfo: [],

      epochNumber: undefined,
      networkName: undefined,
      typeOfProp: "Forward Propagation",
      networkStarted: false,
      net: Network,
      theGraph: { nodes: [], links: [] },
      svg: undefined,
      width: 0,
      height: 0,
      currentLayer: 1,
      epoch: 1,
      currentScreenWidth: window.screen.width,
      currentScreenHeight: window.screen.height,
      steps: [],
    };
  },
  methods: {
    openRegistration() {
      this.loginDialog = false;
      this.registrationDialog = true;
    },
    openLogin() {
      this.loginDialog = true;
      this.registrationDialog = false;
    },
    register() {
      axios
        .post("http://localhost:3000/register", {
          ok: true,
          user: {
            name: this.name,
            email: this.email,
            password: this.password,
          },
        })
        .then((res) => {
          res;
          alert("User created. Please now login");
          this.email = "";
          this.password = "";
          this.name = "";
          this.registrationDialog = false;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    login() {
      axios
        .post("http://localhost:3000/login", {
          userCredentials: {
            email: this.email,
            password: this.password,
          },
        })
        .then((res) => {
          this.$cookie.set("userEmail", res.data.user.email);
          this.$cookie.set("token", res.data.token);
          EventBus.$emit("changeToLogged", "user logged");
          alert("You've been logged in");
          this.loginDialog = false;
          this.email = "";
          this.password = "";
          this.name = "";
        })
        .catch((err) => {
          alert(err.response.data.err.message);
        });
    },
    stopNetwork() {
      let x_train = this.net.x_train;
      let y_train = this.net.y_train;
      let outputS = this.net.output_size;
      let dataS = this.net.dataSize;
      let layersN = this.net.layersN;
      let actF = this.net.actFunc;
      let lossF = this.net.lossFunc;
      let neuronPL = this.net.neuronPerLayer;
      

      this.steps = [];

      this.net = new Network();

      this.currentLayer = 1;
      this.epoch = 1;
      this.typeOfProp = "Forward Propagation";

      this.net.buildCustomNeuralNetwork(
        x_train,
        y_train,
        outputS,
        dataS,
        layersN,
        actF,
        lossF,
        neuronPL
      );
      this.svg.selectAll("*").remove();
      this.updateNodesAndLinks();
    },
    resetNetwork() {
      this.networkName = undefined;
      this.epochNumber = undefined;
      this.typeOfProp = "Forward Propagation";
      this.net = undefined;
      this.networkStarted = false;
      this.currentLayer = 1;
      this.steps = [];
      (this.epoch = 1),
        (this.theGraph = []),
        (this.links = []),
        (this.height = this.currentScreenHeight * 0.09);
      this.resetConfirmationDialog = false;
      this.layersActFuncInfo.length = 0;
      this.svg = d3
        .select("#viz")
        .attr("width", this.width)
        .attr("height", this.height);
      this.svg.selectAll("*").remove();
      EventBus.$emit("resetNetwork", "Network will be reseted");
    },
    verifyLogin() {
      if (!this.$cookie.get("userEmail")) {
        alert("You need to be logged in");
      } else {
        this.saveNetworkDialog = true;
      }
    },
    saveNetwork() {
      if (!this.networkName) {
        alert("Insert the networkName");
        return;
      }
      axios
        .post(
          "http://localhost:3000/neuralNetwork/save",
          {
            neuralNetwork: {
              ownerEmail: this.$cookie.get("userEmail"),
              networkName: this.networkName,
              dataSize: this.net.dataSize,
              numOfLayers: this.net.layersN,
              activationFunctions: this.net.actFunc,
              lossFunction: this.net.lossFunc,
              neuronsPerLayer: this.net.neuronPerLayer,
              xTrain: this.net.x_train,
              yTrain: this.net.y_train,
              outputSize: this.net.output_size,
            },
          },
          {
            headers: { Authorization: this.$cookie.get("token") },
          }
        )
        .then((res) => {
          alert("Saved");
          res;
        })
        .catch((err) => {
          alert(err.response.data.message);
          alert(err.response.data.err.message);
        });
    },
    goToEpoch() {
      let n = parseInt(this.epochNumber, 10);
      if (!Number.isInteger(n)) {
        alert("Must be an integer number");
      } else if (n <= this.epoch) {
        alert(
          "Invalid number. The target epoch must be greater than the current epoch"
        );
      } else {
        let targetEpoch = n - 1;
        this.epochsDialog = false;
        if (this.net.isLayerStep) {
          while (this.net.isLayerStep) {
            this.net.layerStep();
          }

          this.net.fitTo(targetEpoch);
          this.epoch = this.net.currEpoch + 1;
          this.currentLayer = 1;
          this.typeOfProp = "Forward Propagation";
          this.svg.selectAll("*").remove();
          this.updateNodesAndLinks();
        } else {
          this.net.fitTo(targetEpoch);
          this.currentLayer = 1;
          this.epoch = this.net.currEpoch + 1;
          this.typeOfProp = "Forward Propagation";
          this.svg.selectAll("*").remove();
          this.updateNodesAndLinks();
        }
        console.log(this.net);
      }
    },
    nextEpoch() {
      if (this.net.isLayerStep) {
        while (this.net.isLayerStep) {
          this.net.layerStep();
        }
        this.epoch = this.net.currEpoch + 1;
        this.currentLayer = 1;
        this.typeOfProp = "Forward Propagation";
        this.svg.selectAll("*").remove();
        this.updateNodesAndLinks();
      } else {
        this.net.goToNextEpoch();
        this.currentLayer = 1;
        this.epoch = this.net.currEpoch + 1;
        this.typeOfProp = "Forward Propagation";
        this.svg.selectAll("*").remove();
        this.updateNodesAndLinks();
      }
      console.log(this.net);
    },
    nextLayer() {
      this.net.layerStep();
      this.steps = this.net.layerStep();
      console.log(this.net);

      this.epoch = this.net.currEpoch + 1;
      if (this.net.direction == 0) {
        if (this.typeOfProp == "Backward Propagation") {
          /* this.steps = this.net.layerStep(); */
          this.typeOfProp = "Forward Propagation";
          this.currentLayer--;
        } else {
          this.typeOfProp = "Forward Propagation";
          this.currentLayer++;
        }
      } else {
        if (this.typeOfProp == "Forward Propagation") {
          this.typeOfProp = "Backward Propagation";
          this.currentLayer++;
          /* this.steps = this.net.layerStep(); */
        } else {
          this.typeOfProp = "Backward Propagation";
          this.currentLayer--;
        }
      }

      this.svg.selectAll("*").remove();
      this.updateNodesAndLinks();
    },
    updateNodesAndLinks() {
      function round(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
      }
      this.theGraph.nodes = [];
      this.theGraph.links = [];
      let layers = this.net.getLayers();
      let layerNumber = 0;
      let nArray = [];
      for (var p = 0; p < layers.length; p++) {
        if (p == 0 || p % 2 == 0) {
          nArray.push(layers[p].weights.length);
        }
      }
      nArray.push(this.net.output_size);

      for (var i = 0; i < layers.length; i++) {
        if (i == 0 || i % 2 == 0) {
          layerNumber++;
          let numberOfNeurons = layers[i].weights.length;
          for (var j = 0; j < numberOfNeurons; j++) {
            let neuronLabel = "";
            if (i == 0) {
              let dataInput = this.net.x_train[
                this.net.current_datapoint_index
              ];
              neuronLabel = dataInput[j];
            } else {
              if (this.net.all_outputs[i - 1] != undefined) {
                let outputs = this.net.all_outputs[i - 1][0];
                if (outputs.length > 0) {
                  let rawNumber = outputs[j];
                  let roundedNumber = round(rawNumber, 5);
                  neuronLabel = roundedNumber + "";
                }
              }
            }
            let pLS = 0;
            if (layerNumber > 0) {
              pLS = nArray[layerNumber - 2];
            }
            let n = j + 1;
            let node = {
              id: "L" + layerNumber + "N" + n,
              group: layerNumber,
              neuron: n,
              label: neuronLabel,
              last: "no",
              pastLayerSize: pLS,
              layerSize: numberOfNeurons,
            };
            this.theGraph.nodes.push(node);

            if (i < layers.length) {
              let currentNextLayer = nArray[layerNumber];
              let currentSource = "L" + layerNumber + "N" + n;
              for (var k = 0; k < currentNextLayer; k++) {
                let targetLayer = parseInt(layerNumber, 10) + 1;
                let targetNeuron = parseInt(k, 10) + 1;
                let currentTarget = "L" + targetLayer + "N" + targetNeuron;
                let rawCorrespondingWeight = this.net.layers[i].weights[j][k];
                let roundedNumber = round(rawCorrespondingWeight, 5);

                let link = {
                  source: currentSource,
                  target: currentTarget,
                  value: 1,
                  weight: roundedNumber,
                };
                this.theGraph.links.push(link);
              }
            }
          }
        }
      }

      let lastLayerSize = this.net.output_size;
      layerNumber++;
      for (i = 0; i < lastLayerSize; i++) {
        let neuronLabel = "";
        if (this.net.all_outputs[this.net.layers.length - 1] != undefined) {
          let outputs = this.net.all_outputs[this.net.layers.length - 1][0];
          if (outputs.length > 0) {
            let rawNumber = outputs[i];
            let roundedNumber = round(rawNumber, 5);
            neuronLabel = roundedNumber + "";
          }
        }
        let n = i + 1;
        let pLS = nArray[nArray.length - 2];
        let node = {
          id: "L" + layerNumber + "N" + n,
          group: layerNumber,
          neuron: n,
          label: neuronLabel,
          last: "yes",
          pastLayerSize: pLS,
          layerSize: lastLayerSize,
        };
        this.theGraph.nodes.push(node);
      }

      this.generateGraph();
    },

    generateGraph() {
      this.height = this.currentScreenHeight * 0.75;
      let graph = this.theGraph;

      let label = {
        nodes: [],
        links: [],
      };
      graph.nodes.forEach(function (d, i) {
        label.nodes.push({ node: d });
        label.nodes.push({ node: d });
        label.links.push({
          source: i * 2,
          target: i * 2 + 1,
        });
      });
      let labelLayout = d3
        .forceSimulation(label.nodes)
        .force("charge", d3.forceManyBody().strength(-10))
        .force("link", d3.forceLink(label.links).distance(0).strength(2));

      let cond = false;
      if (this.net.layers.length == 8) {
        if (
          this.net.neuronPerLayer[1] >= 3 &&
          this.net.neuronPerLayer[2] <= 2
        ) {
          cond = true;
        }
      }

      d3.forceSimulation(graph.nodes)
        .force("center", d3.forceCenter(this.width / 2, this.height / 2 - 50))
        .force(
          "x",
          d3
            .forceX(function (d) {
              if (d.group == 1) {
                return d.group * 50;
              } else {
                if (cond == true) {
                  if (d.group == 5) {
                    return d.group * 250;
                  } else {
                    if (d.pastLayerSize == 1) {
                      return d.group * 200;
                    } else if (d.pastLayerSize == 2) {
                      return d.group * 250;
                    } else if (d.pastLayerSize == 3) {
                      return d.group * 300;
                    } else {
                      return d.group * 300;
                    }
                  }
                } else {
                  if (d.pastLayerSize == 1) {
                    return d.group * 200;
                  } else if (d.pastLayerSize == 2) {
                    return d.group * 250;
                  } else if (d.pastLayerSize == 3) {
                    return d.group * 300;
                  } else {
                    return d.group * 300;
                  }
                }
              }
            })
            .strength(1)
        )
        .force(
          "y",
          d3
            .forceY(function (d) {
              if (d.layerSize == 1) {
                if (d.pastLayerSize >= 2) {
                  return d.neuron * 800;
                } else {
                  return d.neuron * 700;
                }
              } else if (d.layerSize == 2) {
                if (d.pastLayerSize >= 3) {
                  return d.neuron * 350;
                } else {
                  return d.neuron * 450;
                }
              } else {
                if (d.pastLayerSize == 1) {
                  return d.neuron * 400;
                } else {
                  return d.neuron * 350;
                }
              }
            })
            .strength(1)
        )
        .force(
          "link",
          d3
            .forceLink(graph.links)
            .id(function (d) {
              return d.id;
            })
            .distance(100)
            .strength(1)
        )
        .on("tick", ticked) /* .velocityDecay(0.3).alphaDecay(0.1) */
        .alpha(0.05)
        .restart();

      labelLayout.velocityDecay(0.4);

      this.svg = d3
        .select("#viz")
        .attr("width", this.width)
        .attr("height", this.height);
      let container = this.svg.append("g");

      let link = container
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("stroke", "#aaa")
        .attr("stroke-width", "1px");

      let layerNum = this.currentLayer;
      let node = container
        .append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", 12)
        .attr("fill", function (d) {
          if (d.group == layerNum) {
            return d3.color("#F12525");
          } else {
            if (d.last == "yes") {
              return d3.color("#2550F1");
            } else {
              return d3.color("#9898AA");
            }
          }
        });

      let labelNode = container
        .append("g")
        .attr("class", "labelNodes")
        .selectAll("text")
        .data(label.nodes)
        .enter()
        .append("text")
        .text(function (d, i) {
          if (i % 2 == 0) {
            if (isNaN(d.node.label)) {
              return "0";
            } else {
              return d.node.label;
            }
          } else {
            return "";
          }
        })
        .style("fill", "#555")
        .style("font-family", "Arial")
        .style("font-size", 15)
        .style("pointer-events", "none"); // to prevent mouseover/drag capture

      let labelLink = container
        .append("g")
        .attr("class", "labelLinks")
        .selectAll("text")
        .data(graph.links)
        .enter()
        .append("text")
        .text(function (d) {
          return d.weight;
        })
        .style("fill", "#555")
        .style("font-family", "Arial")
        .style("font-size", 11)
        .style("pointer-events", "none");

      function ticked() {
        node.call(updateNode);
        link.call(updateLink);
        labelLink.each(function (d) {
          if (d.target.y > d.source.y) {
            d.y = d.source.y + (d.target.y - d.source.y) / 4;
            d.x = d.source.x + (d.target.x - d.source.x) / 4;
          } else {
            d.y = d.source.y - (d.source.y - d.target.y) / 4;
            d.x = d.source.x + (d.target.x - d.source.x) / 4;
          }
        });
        labelLink.call(updateLinkLabel);

        labelNode.each(function (d, i) {
          if (i % 2 === 0) {
            d.x = d.node.x;
            d.y = d.node.y - 25;
          }
        });
        labelNode.call(updateNode);
      }
      function fixna(x) {
        if (isFinite(x)) return x;
        return 0;
      }

      function updateLink(link) {
        link
          .attr("x1", function (d) {
            return fixna(d.source.x);
          })
          .attr("y1", function (d) {
            return fixna(d.source.y);
          })
          .attr("x2", function (d) {
            return fixna(d.target.x);
          })
          .attr("y2", function (d) {
            return fixna(d.target.y);
          });
      }
      function updateNode(node) {
        node.attr("transform", function (d) {
          return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
        });
      }
      function updateLinkLabel(labelLink) {
        labelLink.attr("transform", function (d) {
          return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
        });
      }
    },

    generateLayersActData() {
      this.layersActFuncInfo.length = 0;
      let counter = 1;
      let funcMsg = "Layer " + counter + ": None";
      let firstLayer = { index: 0, func: funcMsg };
      this.layersActFuncInfo.push(firstLayer);
      for (let j = 0; j < this.net.actFunc.length; j++) {
        counter++;
        funcMsg = "Layer " + counter + ": " + this.net.actFunc[j] + " ";
        let layerInfo = { index: counter - 1, func: funcMsg };
        this.layersActFuncInfo.push(layerInfo);
        /* if (j == this.net.actFunc.length - 1) {
          counter++;
          if (this.net.lossFunc == "Mean Square Error") {
            funcMsg = "Layer " + counter + ": Linear";
          } else {
            funcMsg = "Layer " + counter + ": Sigmoid";
          }

          layerInfo = { index: counter - 1, func: funcMsg };
          this.layersActFuncInfo.push(layerInfo);
        } */
      }
    },
  },

  created() {
    this.width = this.currentScreenWidth * 0.96;
    this.height = this.currentScreenHeight * 0.55;
    EventBus.$on("giveNetwork", (data) => {
      this.net = data;
      this.networkStarted = true;
      this.updateNodesAndLinks();
      let newXData = "";
      let newYData = "";
      for (let i = 0; i < this.net.x_train.length; i++) {
        let currentX = "(" + this.net.x_train[i] + ") ";
        let currentY = "(" + this.net.y_train[i] + ") ";
        newXData += currentX;
        newYData += currentY;
      }
      this.xDataInfo = newXData;
      this.yDataInfo = newYData;
      this.generateLayersActData();
    });

    EventBus.$on("loginUser", (msg) => {
      console.log(msg);
      this.loginDialog = true;
    });
  },
  mounted() {},
};
</script>
<style scoped>
svg {
  width: 100%;
}
</style>
<style>
.alignment {
  text-align: center;
}
.m-left {
  margin-left: 40%;
}
.m-right {
  margin-right: 40%;
}
.row-margins-btns {
  margin-top: 1%;
  margin-left: 23%;
  margin-right: 23%;
}

.row-margins-lbls {
  margin-left: 22%;
  margin-right: 22%;
}

.margin-top {
  margin-top: 2%;
}

.marginNetwork {
  margin-bottom: 2%;
}
</style>