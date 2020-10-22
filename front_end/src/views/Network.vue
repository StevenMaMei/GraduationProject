<template>
  <div class="force-base-ii">
    <div v-if="networkStarted">
      <h3 class="text-center">
        Current Layer: {{ currentLayer }} -- Current Epoch: {{ epoch }} --
        Current Propagation: {{ typeOfProp }}
      </h3>
      <v-container>
        <v-row no-gutters>
          <v-col class="text-center">
            <v-btn @click="nextLayer()" depressed color="primary">
              Next Layer
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn @click="nextEpoch()" depressed color="primary">
              Next Epoch
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn @click="saveNetwork" depressed color="primary"> Save Network </v-btn>
          </v-col>
          <v-col>
            <v-text-field v-model="networkName" label="NN name"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <svg id="viz" class="container-border"></svg>

    <!-- <p v-if="networkStarted" class="text-center">
      Current error = {{ current_error }}
    </p> -->
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
      
      networkName: undefined,
      current_error: undefined,
      typeOfProp: "Forward",
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
    };
  },
  methods: {
    saveNetwork() {
      if (!this.networkName) {
        alert("Insert the networkName");
        return;
      }
      if (!this.$cookie.get("userEmail")) {
        alert("You are not logged in");
        return;
      }
      axios.post('http://localhost:3000/neuralNetwork/save', {
        neuralNetwork: {
        ownerEmail: this.$cookie.get('userEmail'),
        networkName: this.networkName,
        dataSize:this.net.dataSize,
        numOfLayers: this.net.layersN,
        activationFunctions: this.net.actFunc,
        lossFunction: this.net.lossFunc,
        neuronsPerLayer: this.net.neuronPerLayer
        }
        },  {
           'headers': { 'Authorization': this.$cookie.get('token') }
          })
        .then(res=>{
          console.log(res)
          alert(res.response.data.message);
        })
        .catch((err) => {
          alert(err.response.data.err.message);
        });
    },
    nextEpoch() {
      this.net.goToNextEpoch();
      this.epoch = this.net.currEpoch + 1;
      this.current_error = this.net.current_error;
      this.svg.selectAll("*").remove();
      this.updateNodesAndLinks();
    },
    nextLayer() {
      this.net.layerStep();
      this.net.layerStep();
      console.log(this.net);

      this.epoch = this.net.currEpoch + 1;
      if (this.net.direction == 0) {
        if (this.typeOfProp == "Backward") {
          this.net.layerStep();
          this.typeOfProp = "Forward";
          this.currentLayer++;
        } else {
          this.typeOfProp = "Forward";
          this.currentLayer++;
        }
      } else {
        if (this.typeOfProp == "Forward") {
          this.typeOfProp = "Backward";
          this.net.layerStep();
        } else {
          this.typeOfProp = "Backward";
          this.currentLayer--;
        }
      }
      this.current_error = this.net.current_error;
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
            let n = j + 1;
            let node = {
              id: "L" + layerNumber + "N" + n,
              group: layerNumber,
              neuron: n,
              label: neuronLabel,
              last: "no",
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
            let roundedNumber =
              Math.round((rawNumber + Number.EPSILON) * 100) / 100;
            neuronLabel = roundedNumber + "";
          }
        }
        let n = i + 1;
        let node = {
          id: "L" + layerNumber + "N" + n,
          group: layerNumber,
          neuron: n,
          label: neuronLabel,
          last: "yes",
        };
        this.theGraph.nodes.push(node);
      }

      this.generateGraph();
    },

    generateGraph() {
      this.height = this.currentScreenHeight * 0.55;
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

      d3.forceSimulation(graph.nodes)
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .force(
          "x",
          d3
            .forceX(function (d) {
              return d.group * 400;
            })
            .strength(1)
        )
        .force(
          "y",
          d3
            .forceY(function (d) {
              return 350 + d.neuron * 350;
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
        .on("tick", ticked);

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
          return i % 2 === 0 ? "" : d.node.label;
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
        labelLayout.alphaTarget(0.3).restart();
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
  },

  created() {
    this.width = this.currentScreenWidth * 0.96;
    this.height = this.currentScreenHeight * 0.55;
    EventBus.$on("giveNetwork", (data) => {
      this.net = data;
      this.networkStarted = true;
      this.updateNodesAndLinks();
    });
    EventBus.$on("resetNetwork", (msg) => {
      this.net = undefined;
      this.networkStarted = false;
      this.currentLayer = 1;
      (this.epoch = 1),
        (this.theGraph = []),
        (this.links = []),
        console.log(msg);
      this.height = this.currentScreenHeight * 0.09;
      this.svg = d3
        .select("#viz")
        .attr("width", this.width)
        .attr("height", this.height);
      this.svg.selectAll("*").remove();
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
</style>