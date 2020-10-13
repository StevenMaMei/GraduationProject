<template>
  <div class="force-base-ii">
    <div v-if="networkStarted">
      <h3 class="text-center">
        Current Layer: {{ currentLayer }} -- Current Epoch: {{ epoch }} --
        Current Propagation: {{ typeOfProp }}
      </h3>
      <v-container>
        <v-row no-gutters>
          <v-col class="text-center m-left">
            <v-btn @click="nextLayer()" depressed color="primary">
              Next Layer
            </v-btn>
          </v-col>
          <v-col class="text-center m-right">
            <v-btn @click="nextEpoch()" depressed color="primary">
              Next Epoch
            </v-btn>
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
export default {
  name: "Network",
  components: {},
  data() {
    return {
      current_error: undefined,
      typeOfProp: "Forward",
      networkStarted: false,
      net: Network,
      theGraph: { nodes: [], links: [] },
      svg: undefined,
      width: 1850,
      height: 500,
      currentLayer: 1,
      epoch: 1,
    };
  },
  methods: {
    nextEpoch() {
      this.net.goToNextEpoch();
      this.epoch = this.net.currEpoch + 1;
      this.current_error = this.net.current_error;
      this.svg.selectAll("*").remove();
      this.generateGraph();
    },
    nextLayer() {
      this.net.layerStep();
      this.net.layerStep();
      console.log(this.net);

      this.epoch = this.net.currEpoch + 1;
      if (this.net.direction == 0) {
        this.typeOfProp = "Forward";
        this.currentLayer++;
      } else {
        if (this.typeOfProp == "Forward") {
          this.typeOfProp = "Backward";
        } else {
          this.typeOfProp = "Backward";
          this.currentLayer--;
        }
      }
      this.current_error = this.net.current_error;
      this.svg.selectAll("*").remove();
      this.generateGraph();
    },
    updateNodesAndLinks() {
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

      for (var i = 0; i < layers.length; i++) {
        if (i == 0 || i % 2 == 0) {
          layerNumber++;
          let numberOfNeurons = layers[i].weights.length;
          for (var j = 0; j < numberOfNeurons; j++) {
            let n = j + 1;
            let node = {
              id: "L" + layerNumber + "N" + n,
              group: layerNumber,
              layer: layerNumber,
              neuron: n,
            };
            this.theGraph.nodes.push(node);
            if (i < layers.length - 1) {
              let currentNextLayer = nArray[layerNumber];
              let currentSource = "L" + layerNumber + "N" + n;
              for (var k = 0; k < currentNextLayer; k++) {
                let targetLayer = parseInt(layerNumber, 10) + 1;
                let targetNeuron = parseInt(k, 10) + 1;
                let currentTarget = "L" + targetLayer + "N" + targetNeuron;
                let link = {
                  source: currentSource,
                  target: currentTarget,
                  value: 1,
                };
                this.theGraph.links.push(link);
              }
            }
          }
        }
      }

      this.generateGraph();
    },

    generateGraph() {
      this.height = 500;
      let color = d3.scaleOrdinal(d3.schemeCategory10);
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
      /* let labelLayout = d3
        .forceSimulation(label.nodes)
        .force("charge", d3.forceManyBody().strength(-10))
        .force("link", d3.forceLink(label.links).distance(0).strength(2)); */

      d3.forceSimulation(graph.nodes)
        /* .force('charge', d3.forceManyBody().strength(-3000)) */
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .force(
          "x",
          d3
            .forceX(function (d) {
              return d.layer * 300 /* - 50*this.net.getLayers() */;
            })
            .strength(1)
        )
        .force(
          "y",
          d3
            .forceY(function (d) {
              return 350 + d.neuron * 80;
            })
            .strength(1)
        )
        .force(
          "link",
          d3.forceLink(graph.links).id(function (d) {
            return d.id;
          }) /* .distance(100).strength(1) */
        )
        .on("tick", ticked);

      this.svg = d3
        .select("#viz")
        .attr("width", this.width)
        .attr("height", this.height);
      let container = this.svg.append("g");
      this.svg.call(
        d3
          .zoom()
          .scaleExtent([0.1, 4]) // eslint-disable-line
          .on("zoom", function () {
            container.attr("transform", d3.event.transform);
          })
      );
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
        .attr("r", 5)
        .attr("fill", function (d) {
          if (d.group == layerNum) {
            return color(1);
          } else {
            return color(2);
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
          return i % 2 === 0 ? "" : d.node.id;
        })
        .style("fill", "#555")
        .style("font-family", "Arial")
        .style("font-size", 12)
        .style("pointer-events", "none"); // to prevent mouseover/drag capture

      function ticked() {
        node.call(updateNode);
        link.call(updateLink);
        /* labelLayout.alphaTarget(0.3).restart(); */
        /* labelNode.each(function (d, i) {
          if (i % 2 === 0) {
            d.x = d.node.x;
            d.y = d.node.y;
          } else {
            let b = this.getBBox();
            let diffX = d.x - d.node.x;
            let diffY = d.y - d.node.y;
            let dist = Math.sqrt(diffX * diffX + diffY * diffY);
            let shiftX = (b.width * (diffX - dist)) / (dist * 2);
            shiftX = Math.max(-b.width, Math.min(0, shiftX));
            let shiftY = 16;
            this.setAttribute(
              "transform",
              "translate(" + shiftX + "," + shiftY + ")"
            );
          }
        }); */
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
    },
  },
  created() {
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
      this.height = 100;
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