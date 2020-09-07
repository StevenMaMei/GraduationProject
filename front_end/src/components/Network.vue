<template>
    <div>
        <hr/>
        
   
       
        <hr/>



    </div>

</template>

<script >
const d3 = require("d3");

var vis = d3.select("#graph")
            .append("svg");

var w = 900,
     h = 400;
     vis.attr("width", w)
        .attr("height", h);

 var nodes = [
   {x: 30, y: 50},
      {x: 50, y: 80},
      {x: 90, y: 120}];

 vis.selectAll("circle .nodes")
      .data(nodes)
      .enter()
      .append("svg:circle")
      .attr("class", "nodes")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", "10px")
      .attr("fill", "black") ;


export default {
  name: 'Network',
  data(){
      return{
        

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
