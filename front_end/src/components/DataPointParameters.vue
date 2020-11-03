<template>
  <div class="margin">
    <h3 class="marginB text-center">
      Data Point number {{ dataPointInfo.index + 1 }}
    </h3>

    <p class="text-center">X data:</p>
    <v-row class="text-center marginRows">
      <v-col v-for="point in xJsonFormat" :key="point.position">
        <v-text-field
          v-model="xDataPoint[point.position]"
          outlined
          label="Value"
        ></v-text-field>
      </v-col>
    </v-row>
    <p class="text-center">Y data:</p>
    <v-row class="text-center marginRows">
      <v-col v-for="point in yJsonFormat" :key="point.position">
        <v-text-field
          v-model="yDataPoint[point.position]"
          outlined
          label="Value"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" cols="12">
        <v-btn @click="changeParams()" rounded color="#4511E6" dark
          >Update Data
          <v-icon v-if="dataUpdated" dark right>
            mdi-checkbox-marked-circle</v-icon
          >
          <v-icon v-if="!dataUpdated" dark right> mdi-cancel </v-icon></v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    dataPointInfo: {
      type: Object,
    },
  },
  data() {
    return {
      dataUpdated: false,
      inputSize: 0,
      outputSize: 0,
      xDataPoint: [],
      yDataPoint: [],
      xJsonFormat: [],
      yJsonFormat: [],
    };
  },
  created() {
    this.inputSize = this.dataPointInfo.inputSize;
    this.outputSize = this.dataPointInfo.outputSize;
    for (let j = 0; j < this.inputSize; j++) {
      this.xDataPoint.push(undefined);
      let obj = { position: j };
      this.xJsonFormat.push(obj);
    }
    for (let j = 0; j < this.outputSize; j++) {
      this.yDataPoint.push(undefined);
      let obj = { position: j };
      this.yJsonFormat.push(obj);
    }
  },
  methods: {
    changeParams() {
      let cond = false;
      this.xDataPoint.forEach((element) => {
        element = parseInt(element, 10);
        if (element == undefined) {
          cond = true;
        } else if (!Number.isInteger(element)) {
          cond = true;
        }
      });
      this.yDataPoint.forEach((element) => {
        element = parseInt(element, 10);
        if (element == undefined) {
          cond = true;
        } else if (!Number.isInteger(element)) {
          cond = true;
        }
      });
      if (cond) {
        alert("Insert correct values (numbers) for all the fields");
      } else {
        this.dataUpdated = true;
        this.$emit(
          "updateDP",
          this.xDataPoint,
          this.yDataPoint,
          this.dataPointInfo.index
        );
      }
    },
  },
};
</script>

<style>
.margin {
  margin: 2%;
}
.marginB {
  margin-bottom: 2%;
}
.marginRows {
  margin-right: 25%;
  margin-left: 25%;
}
</style>