
class NeuralNetworkVisualization {

  constructor(width = "80%", height="80%", left="10%", top="20%") {
    this.width = 960
    this.height = 800
    this.number_of_neurons = [2, 3, 0, 0, 0, 0, 0, 0, 0, 1];
    this.number_of_layers = 3;
    this.active_plane = 1;

    this.svg = d3.select("#outer").append("svg")
                 .attr('viewBox','0 0 960 800')
						     .attr('preserveAspectRatio','none')
                 .attr("overflow", "visible")
                 .style("width", width)
                 .style("height", height)
                 .style("left", left)
                 .style("top", top)
                 .style("display", "block")
                 .style("position", "absolute");

    this.svg.append("g").attr("id", "links")
    this.svg.append("g").attr("id", "nodes")
    this.svg.append("g").attr("id", "arrows")
    this.svg.append("g").attr("id", "text")

		this.svg.append('defs')
            .append('marker')
						.attr('id', 'arrowhead')
						.attr('viewBox', '-5 -5 10 10')
						.attr('refX', 0)
						.attr('refY', 0)
						.attr('orient', 'auto')
						.attr('markerWidth', 2)
						.attr('markerHeight', 2)
						.attr('xoverflow', 'visible')
						.append('svg:path')
						.attr('d', 'M 0,0 m -5,-5 L 5,0 L -5,5 Z')
						.attr('fill', '#fff')
						.style('stroke','none');

    this.update();
  }

  init_weights_and_activations() {
    this.weights = []
    this.link_activations = []
    this.neuron_activations = []
    for (var plane = 0; plane < this.number_of_neurons.length; plane++) {
      var link_activations_in_layer = []
      var neuron_activations_in_layer = []
      var weights_in_layer = []
      
      var layer = this.plane2layer(plane)
      var next_plane = this.layer2plane(layer+1)

      for (var i = 0; i < this.number_of_neurons[plane]; i++) {
        neuron_activations_in_layer.push(0.5);
        if (layer < this.number_of_layers-1) {
          var link_activations_in_layer_temp = []
          var weights_in_layer_temp = []
          for (var j = 0; j < this.number_of_neurons[next_plane]; j++) {
            link_activations_in_layer_temp.push(0.5) 
            weights_in_layer_temp.push(0.5) 
          }
          link_activations_in_layer.push(link_activations_in_layer_temp);
          weights_in_layer.push(weights_in_layer_temp);
        }
      }
      this.link_activations.push(link_activations_in_layer)
      this.neuron_activations.push(neuron_activations_in_layer)
      this.weights.push(weights_in_layer)
    }
    
  }

  plane2color(plane) {
    if (plane == 0) {
      return "#000";
    }
    if (plane == this.number_of_neurons.length - 1) {
      return "#000";
    }
    return "#999";
  }

  plane2layer(plane) {
    if (plane == this.number_of_neurons.length - 1)
      return this.number_of_layers-1;
    return plane
  }

  layer2plane(layer) {
    if (layer == this.number_of_layers - 1)
      return this.number_of_neurons.length - 1;
    return layer
  }

  update() {
    
    this.init_weights_and_activations()

    var xdist = this.width / this.number_of_layers;
    var ydist = [];
    for (var plane = 0; plane < this.number_of_neurons.length; plane++) {
      if(this.number_of_neurons[plane] > 0) {
        ydist.push((this.height-250) / this.number_of_neurons[plane]);
      } else {
        ydist.push(0);
      }
    }

    for (var plane = 0; plane < this.number_of_neurons.length; plane++) {

      var layer = this.plane2layer(plane)
      var next_plane = this.layer2plane(layer+1)

      var links = [];
      if (layer < this.number_of_layers-1) {
        for (var i = 0; i < this.number_of_neurons[plane]; i++) {
          for (var j = 0; j < this.number_of_neurons[next_plane]; j++) {
            links.push({"source_x": layer * xdist,
                        "source_y": (i+0.5) * ydist[plane],
                        "target_x": (layer+1) * xdist,
                        "target_y": (j+0.5) * ydist[next_plane],
                        "layer": layer,
                        "source": i,
                        "target": j});
          }
        }
      }

      var link = this.svg.select("#links").selectAll(".link" + plane).data(links);
      link.enter().append("line")
          .attr("class", "link link" + plane)
          .attr("x1", function(d) { return d.source_x; })
          .attr("y1", function(d) { return d.source_y; })
          .attr("x2", function(d) { return d.target_x; })
          .attr("y2", function(d) { return d.target_y; })
          .style("stroke-width", "0vmin")
          .transition()
          .duration(500)
          .style("stroke-width", function(d) { return this.weights[layer][d.source][d.target] + "vmin" }.bind(this));
      link.transition()
          .duration(500)
          .attr("x1", function(d) { return d.source_x; })
          .attr("y1", function(d) { return d.source_y; })
          .attr("x2", function(d) { return d.target_x; })
          .attr("y2", function(d) { return d.target_y; })
          .style("stroke-width", function(d) { return this.weights[layer][d.source][d.target] + "vmin" }.bind(this));
      link.exit()
          .transition()
          .duration(500)
          .style("stroke-width", "0vmin")
          .remove();

      var nodes = []
      for (var i = 0; i < this.number_of_neurons[plane]; i++) {
        nodes.push({"x": layer * xdist, "y": (i+0.5) * ydist[plane], "plane": plane, "source": i});
      }
      var node = this.svg.select("#nodes").selectAll(".neuron" + plane).data(nodes);
      node.enter().append("circle")
          .attr("class", "neuron neuron" + plane)
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
          .attr("r", 0)
          .on("click", function(d) { 
            this.set_active_plane(d.plane);
          }.bind(this))
          .style("fill", function(d) { return this.plane2color(d.plane); }.bind(this))
          .transition()
          .duration(500)
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
          .attr("r",  30);
      node.transition()
          .duration(500)
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
          .attr("r", 30);
      node.exit()
          .transition()
          .duration(500)
          .attr("r", 0)
          .remove();
    }
  }

  set_active_plane(plane) {
    this.active_plane = parseInt(plane);
    d3.select('#neuronslider').property("value", this.number_of_neurons[this.active_plane]);
  }

  set_number_of_neurons_in_active_layer(number_of_neurons_in_active_layer) {
    number_of_neurons_in_active_layer = parseInt(number_of_neurons_in_active_layer)
    this.number_of_neurons[this.active_plane] = number_of_neurons_in_active_layer;
    this.update();
  }

  set_number_of_layers(number_of_layers) {
    // Layers were removed
    number_of_layers = parseInt(number_of_layers)
    if(number_of_layers < this.number_of_layers) {
      for(var plane = number_of_layers-1; plane < this.number_of_neurons.length-1; plane++) {
        this.number_of_neurons[plane] = 0
      }
    // Layers were added
    } else {
      for(var plane = this.number_of_layers-1; plane < number_of_layers-1; plane++) {
        this.number_of_neurons[plane] = this.number_of_neurons[this.number_of_layers-2]
      }
    }
    this.set_active_plane(number_of_layers-2)
    this.number_of_layers = number_of_layers;
    this.update();
  }

  forward_pass() {

    var time_per_layer = 1000

    for (var i = 0; i < this.link_activations.length; i++) {
      for(var j = 0; j < this.link_activations[i].length; j++) {
        for(var k = 0; k < this.link_activations[i][j].length; k++) {
          this.link_activations[i][j][k] = Math.random();
        }
      }
    }
    
    for (var i = 0; i < this.neuron_activations.length; i++) {
      for(var j = 0; j < this.neuron_activations[i].length; j++) {
        this.neuron_activations[i][j] = Math.random();
      }
    }
    
    for (var layer = 0; layer < this.number_of_layers; layer++) {
      var plane = this.layer2plane(layer)
      var node = this.svg.select("#nodes").selectAll(".neuron" + plane)
      node.transition()
          .delay(layer * time_per_layer)
          .duration(1000)
          .style("fill", function(d) { return d3.interpolateRdBu(this.neuron_activations[plane][d.source]) }.bind(this));
      node.transition()
          .delay(this.number_of_layers * time_per_layer)
          .duration(2000)
          .style("fill", function(d) { return this.plane2color(d.plane); }.bind(this))
      
      var link = this.svg.select("#links").selectAll(".link" + plane);
      link.transition()
          .delay(layer * time_per_layer + time_per_layer/2)
          .duration(1000)
          .style("stroke", function(d) { return d3.interpolateRdBu(this.link_activations[plane][d.source][d.target]) }.bind(this));
      link.transition()
          .delay(this.number_of_layers * time_per_layer)
          .duration(2000)
          .style("stroke", "#fff")
    }
      
    var arrow = this.svg.select('#arrows')
                        .append("line")
                        .attr("class", "arrow")
                        .attr("marker-end", "url(#arrowhead)")
                        .attr("x1", 0)
                        .attr("y1", this.height-150)
                        .attr("x2", 10)
                        .attr("y2", this.height-150)
                        .style("stroke", "white")
                        .style("fill", "white")
                        .style("stroke-width", "0px")
                        .transition()
                        .duration(100)
                        .style("stroke-width", "3vmin")
                        .transition()
												.ease(d3.easeLinear)
                        .duration(this.number_of_layers * time_per_layer)
                        .attr("x2", this.width * (this.number_of_layers - 1) / this.number_of_layers)
                        .transition()
                        .duration(500)
                        .style("stroke-width", "0vmin")
                        .remove();

			var text = this.svg.select('#text')
												 .append('text')
                         .attr('class', 'text')
                         .attr('transform', "translate(" + 100 + "," + (this.height-200) + ")" )
                         .text("Forward Propagation of Activations")
                         .style("opacity", 0)
                         .transition()
                         .duration(500)
                         .style("opacity", 1)
                         .transition()
                         .delay(this.number_of_layers * time_per_layer)
                         .duration(500)
                         .style("opacity", 0)
                         .remove()
  }

  backward_pass() {

    var time_per_layer = 1000
    
      for (var i = 0; i < this.link_activations.length; i++) {
      for(var j = 0; j < this.link_activations[i].length; j++) {
        for(var k = 0; k < this.link_activations[i][j].length; k++) {
          this.link_activations[i][j][k] += 0.8*(Math.random() - 0.5);
        }
      }
    }
    
    for (var i = 0; i < this.neuron_activations.length; i++) {
      for(var j = 0; j < this.neuron_activations[i].length; j++) {
        this.neuron_activations[i][j] += 0.3*(Math.random() - 0.5);
      }
    }
    
    for (var i = 0; i < this.weights.length; i++) {
      for(var j = 0; j < this.weights[i].length; j++) {
        for(var k = 0; k < this.weights[i][j].length; k++) {
          this.weights[i][j][k] = Math.random();
        }
      }
    }
    
    for (var layer = 0; layer < this.number_of_layers; layer++) {
      var plane = this.layer2plane(layer)
      var node = this.svg.select("#nodes").selectAll(".neuron" + plane)
      node.transition()
          .delay((this.number_of_layers-layer-1) * time_per_layer)
          .duration(1000)
          .style("fill", function(d) { return d3.interpolateRdBu(this.neuron_activations[plane][d.source]) }.bind(this));
      node.transition()
          .delay(this.number_of_layers * time_per_layer)
          .duration(2000)
          .style("fill", function(d) { return this.plane2color(d.plane); }.bind(this))
      
      var link = this.svg.select("#links").selectAll(".link" + plane);
      link.transition()
          .delay((this.number_of_layers-layer-1) * time_per_layer - time_per_layer/2)
          .duration(1000)
          .style("stroke-width", function(d) { return this.weights[plane][d.source][d.target] + "vmin" }.bind(this))
          .style("fill", function(d) { return d3.interpolateRdBu(this.link_activations[plane][d.source][d.target]) }.bind(this));
      link.transition()
          .delay(this.number_of_layers * time_per_layer)
          .duration(2000)
          .style("stroke", "#fff")
    }
    
    var arrow = this.svg.select('#arrows')
                        .append("line")
                        .attr("class", "arrow")
                        .attr("marker-end", "url(#arrowhead)")
                        .attr("x1", this.width * (this.number_of_layers - 1) / this.number_of_layers)
                        .attr("y1", this.height-150)
                        .attr("x2", this.width * (this.number_of_layers - 1) / this.number_of_layers - 10)
                        .attr("y2", this.height-150)
                        .style("stroke", "white")
                        .style("fill", "white")
                        .style("stroke-width", "0vmin")
                        .transition()
                        .duration(100)
                        .style("stroke-width", "3vmin")
                        .transition()
												.ease(d3.easeLinear)
                        .duration(this.number_of_layers * time_per_layer)
                        .attr("x2", 0)
                        .transition()
                        .duration(500)
                        .style("stroke-width", "0vmin")
                        .remove();

			var text = this.svg.select('#text')
												 .append('text')
                         .attr('class', 'text')
                         .attr('transform', "translate(" + 100 + "," + (this.height-200) + ")" )
                         .text("Back-Propagation of Gradients")
                         .style("opacity", 0)
                         .transition()
                         .duration(500)
                         .style("opacity", 1)
                         .transition()
                         .delay(this.number_of_layers * time_per_layer)
                         .duration(500)
                         .style("opacity", 0)
                         .remove()
  }
}

