// var data = [
//     {
//         Date : "2017-12-17 18:30:01",
//         Sales : "50"

//     },
//     {   Date : "2017-12-17 17:30:00",
//         Sales : "20"

//     },
//     {
//         Date : "2017-12-17 16:30:00",
//         Sales : "244"
//     }
// ].map(function(entry) {
//   return {
//     Date: d3.timeParse("%Y-%m-%d %H:%M:%S")(entry.Date),
//     Sales: +entry.Sales
//   }
// });

// var data2 = [
//     {
//         Date : "2017-12-17 18:30:01",
//         Sales : "100"

//     },
//     {   Date : "2017-12-17 17:30:00",
//         Sales : "70"

//     },
//     {
//         Date : "2017-12-17 16:30:00",
//         Sales : "0"
//     }
// ].map(function(entry) {
//   return {
//     Date: d3.timeParse("%Y-%m-%d %H:%M:%S")(entry.Date),
//     Sales: +entry.Sales
//   }
// });


// var svg = d3.select("svg"),
//     margin = {top: 20, right: 20, bottom: 30, left: 50},
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom,
//     g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var x = d3.scaleTime()
//     .rangeRound([0, width]);

// var y = d3.scaleLinear()
//     .rangeRound([height, 0]);



// x.domain(d3.extent(data, function(d) { return d.Date; }));
// y.domain(d3.extent(data, function(d) { return d.Sales; }));

// g.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))

// g.append("g")
//     .call(d3.axisLeft(y))

// g.append("path")
//     .datum(data)
//     .attr("fill", "none")
//     .attr("stroke", "steelblue")
//     .attr("stroke-linejoin", "round")
//     .attr("stroke-linecap", "round")
//     .attr("stroke-width", 1.5)
//     .attr("d", line);