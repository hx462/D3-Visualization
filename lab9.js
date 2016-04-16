//Render  an  interactive scatterplot of  the data:
//– Dimensions   for  x-axis  and y-axis  can be  selected.
//– Filtering  on MPG is  supported.
//– Hovered car name  is  shown as  the h4  header.

$(document).ready(function() {


var draw = function(xKey, yKey) {
	

var xValue = function(d) { return d[xKey]; }, yValue = function(d) { return d[yKey]; };

var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);
// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d[xKey]); })
    .y(function(d) { return y(d[yKey]); });
    
// Adds the svg canvas 
var svg = d3.select(".plot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");
// Get the data
d3.csv("car.csv", function(error, data) {
	console.log(data[0])
   data.forEach(function(d) {
	    // csv data are input one row at a time
		var key = Object.keys(d)
		for(var i = 0; i < key.length-1; i++) {
		// change string into number format
			if (!isNaN(d[key[i]])){
				d[key[i]] = +d[key[i]];
				}
		}

    });
	console.log(data[0])
    // Scale the range of the data
    x.domain([d3.min(data, xValue)-10, d3.max(data, xValue)+30]);
    y.domain([d3.min(data, yValue)-5, d3.max(data, yValue)+5]);
    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .data(data);
    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d[xKey]); })
        .attr("cy", function(d) { return y(d[yKey]); })
		
    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
	  .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(xKey);
	  
    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
	  .append("text") 
        .attr("class", "label")
        .attr("x", 30)
        .attr("y", -6)
		.attr("transform", "rotate(90)")
        .style("text-anchor", "end")
        .text(yKey);
});

};

draw('displacement', 'mpg');
// var xKey = 'displacement', yKey = 'mpg';

var update = $("#update");
$("button").click(function(){	

	update.css('color','red');
	draw('mpg', 'displacement');
	
	
	});

// $("#hovered").text("hello!");





d3.csv("car.csv", function(d) {
	
	// csv data are input one row at a time
	var key = Object.keys(d)
	for(var i = 0; i < key.length-1; i++) {
		// change string into number format
		if (!isNaN(d[key[i]])){
			d[key[i]] = +d[key[i]];
		}
	}		
  
    return d
  
}, function(data) {
	// Try to assign values to axis x and axis y
  	var select = document.getElementById("sel-x");
	var options = Object.keys(data[0])	
	for(var i = 0; i < options.length-1; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    }
    
    var select2 = document.getElementById("sel-y");
	//var options = ["mpg",	"cylinders",	"displacement",	"horsepower",	"weight",	"acceleration",	"model.year"];
	for(var i = 0; i < options.length-1; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select2.appendChild(el);
	}
	
	// $("button").click(function(){	
		// focused.css('color','red');
	// });

});


function jsFunction(value)
	{
		alert(value);
	}
	

});




// Update the MPG
// $("button").click(function(){	
		
	
    // Updating the MPG	
	// var update = $("#update");
	
	// });





