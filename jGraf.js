

function drawGraf(f, data, height, width, locId) {
  console.log(data);

  //преобразование данных в тип json
  if(typeof data == "string") {
    var datas = JSON.parse(data);
  } else if (data.items == null) {
    var datas = {items:data};
  } else {
    var datas = data;
  }

  datas.items.sort(function(a, b){return a.x - b.x;})
  var count = datas.items.length;

  var margin = f.margin,
      padding = f.padding;
     

  var svg = d3.select(locId).append("svg")
              .attr("class", "axis")
              .attr("width", width)
              .attr("height", height);
   
  // длина оси X= ширина контейнера svg - отступ слева и справа
  var xAxisLength = width - 2 * margin;     
    
  // длина оси Y = высота контейнера svg - отступ сверху и снизу
  var yAxisLength = height - 2 * margin;

  var scaleX = d3.scaleLinear()
              .domain([1, datas.items[count-1].x+1])
              .range([0, xAxisLength]);
               
  // функция интерполяции значений на ось Y
  datas.items.sort(function(a, b){return a.y - b.y;})
  var scaleY = d3.scaleLinear()
                 .domain([datas.items[count-1].y+1, 0])
                 .range([0, yAxisLength]);

  datas.items.sort(function(a, b){return a.x - b.x;})
  if(f.xAxis.exists != undefined){
    if(f.xAxis.exists==true) {
    // создаем ось X   
      if(f.xAxis.locationLabel=="top") {
        var xAxis = d3.axisTop()
                      .scale(scaleX);
      } else {
        var xAxis = d3.axisBottom()
                      .scale(scaleX);
      } 
      // отрисовка оси Х             
      var loc;
      if(f.xAxis.location=="down"){
        loc = height - margin;
      } else {
        loc = margin;
      }
      var colorY;
      if((f.xAxis.color==undefined)||(f.xAxis.color == "")) {
        colorX = "#000000"; 
      } else {
        colorX = f.xAxis.color;
      }
      svg.append("g")
         .attr("class", "x-axis")
         .attr("transform",  // сдвиг оси вниз и вправо
             "translate(" + margin + "," + (loc) + ")")
         .style("color", colorX)
         .call(xAxis);
    }
  }
  if(f.yAxis != undefined) {
    if(f.yAxis.exists==true) {
        // создаем ось Y     
      if(f.yAxis.locationLabel == "left") {
        var yAxis = d3.axisLeft()
                      .scale(scaleY);
      } else {
        var yAxis = d3.axisRight()
                      .scale(scaleY);
      }
      var colorY;
      if((f.yAxis.color==undefined)||(f.yAxis.color=="")) {
        colorY = "#000000"; 
      } else {
        colorY = f.yAxis.color;
      }
      var loc;
      if(f.yAxis.location=="left") {
        loc = margin;
      } else {
        loc = margin+xAxisLength;
      }
      svg.append("g")       
        .attr("class", "y-axis")
        .attr("transform", // сдвиг оси вниз и вправо на margin
                "translate(" + loc + "," + margin + ")")
        .style("color", colorY)
        .call(yAxis);
    }
  }
  if(f.gridLineX != undefined) {
    if(f.gridLineX.exists) {
      d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLength))
        .attr("transform", f.xAxis.location!="down"? "scale(-1)": "scale(1)")
        .attr("stroke", f.gridLineX.color==undefined ? "#8B0000": f.gridLineX.color)
        .attr("stroke-width", f.gridLineX.height==undefined? "1px": f.gridLineX.height)
        .attr("stroke-opacity", "0.1");
    }
  }
  if(f.gridLineY != undefined) {
    if(f.gridLineY.exists==true) {
      d3.selectAll("g.y-axis g.tick")
          .append("line")
          .classed("grid-line", true)
          .attr("x1", xAxisLength)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", 0)
          .attr("transform", f.yAxis.location=="right"? "scale(-1)": "scale(1)")
          .attr("stroke", f.gridLineY.color==undefined? "#000000": f.gridLineY.color)
          .attr("stroke-width", f.gridLineY.height==undefined? "1px": f.gridLineY.height)
          .attr("stroke-opacity", "0.1");
    }  
  }

  // создаем объект g для прямоугольников
  var g = svg.append("g")
             .attr("class", "body")
             .attr("transform",  // сдвиг объекта вправо
                   "translate(" + margin + ", 0 )");
  var colorC;
  if(f.colorContent==undefined) {
    colorC = "#000000"
  } else {
    colorC = f.colorContent;
  }
  //связываем данные с прямоугольниками
  g.selectAll("rect.bar")
      .data(datas.items)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("fill", colorC);
  g.selectAll("g.bar").append("rect");
      
  // устанавливаем параметры прямоугольников
  var rects = g.selectAll("rect")
      .data(datas.items)
      .attr("x", function (d) { 
          return scaleX(d.x);
      })
      .attr("y", function (d) { 
          return scaleY(d.y) + margin;
      })
      .attr("height", function (d) { 
          return yAxisLength - scaleY(d.y); 
      })
      .attr("width", function(d){ 
          return Math.floor(xAxisLength / datas.items[count-1].x) - padding;
      });
      if(f.textDescriptionData != undefined) {
        if(f.textDescriptionData.exists==true) {
          if((f.textDescriptionData.fontSize==undefined)||((f.textDescriptionData.fontSize==""))) {
            var fontSize = "12"
          } else {
            var fontSize = f.textDescriptionData.fontSize;
          }  
          g.selectAll("g.bar").append("text");
          g.selectAll("text")
           .data(datas.items)
           .attr("x", function (d, i) { 
              return scaleX(d.x) + (Math.floor(xAxisLength / datas.items[count-1].x) - padding)/2;
            })
           .attr("y", function (d) { 
              if(f.textDescriptionData.location=="inToUp"){
                return scaleY(d.y) + margin+1.5*fontSize;
              } else {
                return scaleY(d.y) + margin-2;
              }
            })
          .text(function(d){return d.y;})
          .attr("font-family", f.textDescriptionData.fontFamily==undefined ? "sans-serif" : f.textDescriptionData.fontFamily)
          .attr("font-size", fontSize+"px")
          .attr("fill", f.textDescriptionData.colorText==undefined ? "#000000" : f.textDescriptionData.colorText)
          .attr("text-anchor", f.textDescriptionData.textAnchor==undefined ? "middle" : f.textDescriptionData.textAnchor);
      }
    }
    if(f.typeAnimation=="1") {
      rects.on('mouseover', function(d) {
        d3.select(this)  // Выберем элемент, на который наведена мышь
          .transition()  // Начинаем анимацию
          .duration(f.durationAnimation) // Длительность анимации
          .attr("height", function(d) { 
            return (yAxisLength - scaleY(d.y))*1.1;
          })
          .attr("y", function(d) {
            return (scaleY(d.y)+ margin) - (yAxisLength - scaleY(d.y))*0.1;
          })
          .attr("fill", f.hoverColor==undefined ? "#000000" : f.hoverColor);
        d3.select(this.parentNode).selectAll("text")
          .attr("y", function(d) {
            return scaleY(d.y) + margin-2-(yAxisLength - scaleY(d.y))*0.1;
          })
          .attr("fill", f.hoverColor==undefined ? "#000000" : f.hoverColor)  
      })
      .on('mouseleave', function(d) {
          //console.log(this);
        d3.select(this)
          .transition()
          .duration(f.durationAnimation)
          .attr("y", function(d) {
            return scaleY(d.y)+margin;
          })
          .attr("height", function(d) { 
            return yAxisLength - scaleY(d.y);
          })
          .attr("fill", f.colorContent==undefined ? "#000000" : f.colorContent);
        d3.select(this.parentNode)
          .selectAll("text")
          .attr("y", function(d) {
            return scaleY(d.y) + margin-2;
          })
          .attr("fill", f.textDescriptionData.colorText==undefined ? "#000000" : f.textDescriptionData.colorText)
      });
    }

  if(f.chartName != undefined) {
    if(f.chartName.exists) {
      d3.select("svg.axis").append("text")
        .attr("x", width / 2)
        .attr("y", f.chartName.margin)
        .text(f.chartName.text)
        .attr("font-family", f.chartName.fontFamily==undefined ? "sans-serif" : f.chartName.fontFamily)
        .attr("font-size", f.chartName.fontSize==undefined ? "14px" : f.chartName.fontSize+"px")
        .attr("text-anchor", f.chartName.textAnchor==undefined ? "middle" : f.chartName.textAnchor);
    }
  }

  if(f.loadFromUrl.loading) {
    if(f.loadFromUrl.updateGrafByTime){
      var timerId = setInterval(function() {
        d3.request(f.loadFromUrl.url)
          .on('error', function(e) {
            clearInterval(timerId);
            alert(e);
          })
          .header("Content-Type", "application/json")
          .get(function(data) {
            console.log(data.response);
            d3.select(locId).select("svg").remove();
            drawGraf(f, data.response, height, width, locId);
          })
      }, f.loadFromUrl.timeInterval);
    }
  }
}

$(function () {
  $.getJSON("sett.json", function(data){
    $.each(data.graphics, function(i, f) {
    if(f.loadFromUrl.loading==true) {
      d3.request(f.loadFromUrl.url)
        .header("Content-Type", "application/json")
        .get(function(data) {
          console.log(data.response);
          drawGraf(f, data.response, f.height, f.width, f.locId);
          })
    } 
    else if(f.pathData != "") {
      d3.json(f.pathData, function(datad) {
      drawGraf(f, datad, f.height, f.width, f.locId);
    });
   
  } else {
      inputData = [{x: 1, y: 55},
        {x: 2, y: 67}, {x: 3, y: 74},{x: 4, y: 63},
        {x: 5, y: 56}, {x: 6, y: 24}, {x: 7, y: 26},
        {x:8, y: 19}, {x: 9, y: 42}, {x: 10, y: 88},
        {x: 11, y: 80}, {x: 12, y: 77}
    ];
    console.log(inputData);
      drawGraf(f, inputData, f.height, f.width, f.locId);
  } 
});

})
  .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + errorThrown); })
})

//функция отрисовки столбиковой диаграммы для внешнего использования
function drawBarChart (pathSet, height, width, locId, inputData) {
  $.getJSON(pathSet, function(data){
    $.each(data.graphics, function(i, f) {
      if(inputData != undefined) {
        drawGraf(f, inputData, height||f.height, width||f.width, locId||f.locId);
      } else if(f.loadFromUrl.loading==true) {
        d3.request(f.loadFromUrl.url)
          .header("Content-Type", "application/json")
          .get(function(data) {
            drawGraf(f, data.response, height||f.height, width||f.width, locId||f.locId);
          })
      } else if((f.pathData != undefined)||(f.pathData != "")) {
        d3.json(f.pathData, function(datad) {
          drawGraf(f, datad, height||f.height, width||f.width, locId||f.locId);
        });
      } else {
        console.log("Введите название файла в найстройках!");
      }
    });
  })
  .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + errorThrown); })
}  

//функция отрисовки столбиковой диаграммы с данными извне  
function drawBarChartInputData (pathSet, height, width, locId, inputData) {
  $.getJSON(pathSet, function(data){
    $.each(data.graphics, function(i, f) {
      drawGraf(f, inputData, height||f.height, width||f.width, locId||f.locId);
    });
  })
  .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + errorThrown); })
}

//функция отрисовки линейного графика
function drawLineChart (pathSet, height, width, locId) {
  $.getJSON(pathSet, function(data){
    $.each(data.lines, function(i, f) {
      if(f.loadFromUrl.loading==true) {
        d3.request(f.loadFromUrl.url)
          .header("Content-Type", "application/json")
          .get(function(data) {
            drawLines(f, data.response, height||f.height, width||f.width, locId||f.locId);
          })
          .on('error', function(e) {
            console.log(e);
          }) 
      } else if((f.pathData != undefined)||(f.pathData != ""))  {
        d3.json(f.pathData, function(datad) {
          drawLines(f, datad, height||f.height, width||f.width, locId||f.locId);
        })
        .on('error', function(e) {
          console.log(e);
        });
      } else {
        console.log("Введите название файла в найстройках!");
      }
    });
  })
  .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + errorThrown); })
}

// function drawLineChartInputData (pathSet, height, width, locId, inputData) {
//   $.getJSON(pathSet, function(data){
//     $.each(data.graphics, function(i, f) {
//       drawLines(f, inputData, height, width, locId);
//     });
//   })
//   .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + errorThrown); })
// }

$(function () {
  $.getJSON("settLines.json", function(data){
    $.each(data.lines, function(i, f) {

    if(f.loadFromUrl.loading==true) {
      //console.log
      d3.request(f.loadFromUrl.url)
        .header("Content-Type", "application/json")
        .get(function(data) {
          console.log(data.response);
          drawLines(f, data.response, f.height, f.width, f.locId);
          })
    } 
    else {
      d3.json(f.pathData, function(datad) {
      drawLines(f, datad, f.height, f.width, f.locId);
    }).on('error', function(e) {
      console.log(e);
    });
   
  }
});

}).fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + errorThrown); })
});




function drawLines(f, data, height, width, locId) {

  if(typeof data == "string") {
    var items = JSON.parse(data);
    var datas = {lines:items};
  } else if (data.lines == null) {
    datas = {lines:data}
  } else {
    var datas = data;
  }

  //console.log(datas);
  var margin = f.margin;
  var svg = d3.select("body").append("svg")
              .attr("class", "axis")
              .attr("id", locId.substring(1))
              .attr("width", width)
              .attr("height", height);

  var xAxisLength = width - 3 * margin;     
  
// длина оси Y = высота контейнера svg - отступ сверху и снизу
  var yAxisLength = height - 2 * margin;

  const colorScale = d3.scaleOrdinal(d3.schemeCategory20);             
  var itemss = datas.lines;
  //console.log(itemss);
  var minX = d3.min(itemss[0].items, function(d) {return d.x;});
  var maxX = d3.max(itemss[0].items, function(d) {return d.x;});
  //console.log(maxX);
  var maxY = d3.max(itemss[0].items, function(d) {return d.y;});
  var minY = d3.min(itemss[0].items, function(d) {return d.y;});
  $.each(itemss, function(i, f) {
    if(maxX < d3.max(f.items, function(d) {return d.x;})) {
      maxX = d3.max(f.items, function(d) {return d.x;});
    } 
    if(maxY < d3.max(f.items, function(d) {return d.y;})) {
      maxY = d3.max(f.items, function(d) {return d.y;});
    } 
    if(minX > d3.min(f.items, function(d) {return d.x;})) {
      minX = d3.min(f.items, function(d) {return d.x;});
    }
    if(minY > d3.min(f.items, function(d) {return d.y;})) {
      minY = d3.min(f.items, function(d) {return d.y;});
    }
  });

  const scaleX = d3.scaleLinear()
                   .domain([minX, maxX])
                   .range([0, xAxisLength]);

  const scaleY = d3.scaleLinear()
                   .domain([maxY, minY])
                   .range([0, yAxisLength]);

  var datad = [];
  $.each(itemss, function(i, f) {
    var item = {item:[], enabled: true, lineId:itemss[i].lineId};
    datad.push(item);
    var d = datad[i];
    $.each(f.items, function(j, f){
      d.item.push({x: scaleX(f.x)+margin, y: scaleY(f.y) + margin});
    })
  })
  if(f.xAxis!=undefined) {
    console.log("tut");
    if(f.xAxis.exists==true) {
          console.log("tut")

    // создаем ось X   
      if(f.xAxis.locationLabel=="top") {
        var xAxis = d3.axisTop()
                      .scale(scaleX);
      } else {
        var xAxis = d3.axisBottom()
                      .scale(scaleX);
      } 
           // отрисовка оси Х             
      var loc;
      if(f.xAxis.location=="down"){
        loc = height - margin;
      } else {
        loc = margin;
      }
      var colorY;
      if(f.xAxis.color==undefined) {
        colorX = "#000000"; 
      } else {
        colorX = f.xAxis.color;
      }
      svg.append("g")
         .attr("class", "x-axis")
         .attr("transform",  // сдвиг оси вниз и вправо
             "translate(" + margin + "," + (loc) + ")")
         .style("color", colorX)
         .call(xAxis);
    }
  }
  if(f.yAxis != undefined) {
    if(f.yAxis.exists==true) {
        // создаем ось Y     
      if(f.yAxis.locationLabel == "left") {
        var yAxis = d3.axisLeft()
                      .scale(scaleY);
      } else {
        var yAxis = d3.axisRight()
                      .scale(scaleY);
      }
      var colorY;
      if(f.yAxis.color==undefined) {
        colorY = "#000000"; 
      } else {
        colorY = f.yAxis.color;
      }
      var loc;
      if(f.yAxis.location=="left"){
        loc = margin;
      } else {
        loc = margin+xAxisLength;
      }
      svg.append("g")       
        .attr("class", "y-axis")
        .attr("transform", // сдвиг оси вниз и вправо на margin
                "translate(" + loc + "," + margin + ")")
        .style("color", colorY)
        .call(yAxis);
    }
  }

  // создаем набор вертикальных линий для сетки 
  if(f.gridLineX != undefined) {
    if(f.gridLineX.exists) {
      d3.select(locId).selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("stroke", f.gridLineX.color==undefined ? "#8B0000": f.gridLineX.color)
        .attr("stroke-opacity", "0.1")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLength));
    }
  }
    
  // рисуем горизонтальные линии координатной сетки
  if(f.gridLineY != undefined) {
    if(f.gridLineY.exists) {
      d3.select(locId).selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("stroke", f.gridLineY.color==undefined ? "#8B0000": f.gridLineY.color)
        .attr("stroke-opacity", "0.1")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLength)
        .attr("y2", 0);
    }
  }

  var line = d3.line()
              .x(function(d){return d.x;})
              .y(function(d){return d.y;})
  if(f.curve) {
    line.curve(d3.curveCardinal);
  }            
              

//легенда диаграммы  
  if(f.legend != undefined) {
    if(f.legend.exists) {
      var legendTable = d3.select(locId).append("g")
          .attr("transform", "translate("+(-10)+", "+(margin)+")")
          .attr("class", "legendTable");
       
      var legend = legendTable.selectAll(".legend")
          .data(datad)
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) {
              return "translate(0, " + i * 20 + ")"; 
          })

          .on('click', clickLegendHandler);
       
      legend.append("rect")
          .attr("x", width - 50)
          .attr("y", 4)
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", function(d, i) { return colorScale(d.lineId); });
       
      legend.append("text")
          .attr("x", width - 35)
          .attr("y", 9)
          .attr("dy", ".35em")
          .attr("font-family", f.legend.fontFamily==undefined ? "serif" : f.legend.fontFamily)
          .attr("fill", f.legend.colorTextEnabled==undefined ? "#000000" : f.legend.colorTextEnabled)
          .text(function(d, i) { return "line "+d.lineId; });
    }
  }
  if(f.loadFromUrl.loading) {
    if(f.loadFromUrl.updateGrafByTime){
      var timerId = setInterval(function() {
        d3.request(f.loadFromUrl.url)
          .on('error', function(e) {
            clearInterval(timerId);
            alert(e);
          })
          .header("Content-Type", "application/json")
          .get(function(data) {
            convertData(data.response);
            redrawLegend();
            redrawLines();
          })
      }, f.loadFromUrl.timeInterval);
    }
  }

  redrawLines();

  //название диаграммы
  if(f.chartName != undefined) {
    if(f.chartName.exists) {
      d3.select(locId).append("g").append("text")
          .attr("x", width / 2)
          .attr("y", f.chartName.margin)
          .text(f.chartName.text)
          .attr("font-family", f.chartName.fontFamily==undefined ? "sans-serif" : f.chartName.fontFamily)
          .attr("font-size", f.chartName.fontSize==undefined ? "14px" : f.chartName.fontSize+"px")
          .attr("text-anchor", f.chartName.textAnchor==undefined ? "middle" : f.chartName.textAnchor);
    }
  }
  function redrawLegend() {
    legendTable.selectAll(".legend").remove();
    var legend = legendTable.selectAll(".legend")
        .data(datad)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(0, " + i * 20 + ")"; 
        });
     
    legend.append("rect")
        .attr("x", width - 50)
        .attr("y", 4)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function(d, i) { return colorScale(d.lineId); });
     
    legend.append("text")
        .attr("x", width - 35)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("font-family", f.legend.fontFamily==undefined ? "serif" : f.legend.fontFamily)
        .attr("fill", f.legend.colorTextEnabled==undefined ? "#000000" : f.legend.colorTextEnabled)
        .text(function(d, i) { return "line "+d.lineId; })
        .on('click', clickLegendHandler);
  }

  function convertData(dataFUrl) {
    var itemsU = JSON.parse(dataFUrl);
    var datasU = {lines:itemsU};
    var itemss = datasU.lines;
    datad = [];

    $.each(itemss, function(i, f) {
      var item = {item:[], enabled: true, lineId:itemss[i].lineId};
      datad.push(item);
      var d = datad[i];
      $.each(f.items, function(j, f){
        d.item.push({x: scaleX(f.x)+margin, y: scaleY(f.y) + margin});
      })
    })
  }
  function clickLegendHandler(lineId) {
  console.log(datad[lineId.lineId].enabled);
    if(datad[lineId.lineId].enabled) {
      console.log("tut");
      d3.select(this).select("text").attr("fill", f.legend.colorTextNotEnabled==undefined ? "#808080" : f.legend.colorTextNotEnabled);
    } else {
      d3.select(this).select("text").attr("fill", f.legend.colorTextEnabled==undefined ? "#000000" : f.legend.colorTextEnabled);
    }
    datad[lineId.lineId].enabled = !datad[lineId.lineId].enabled;
    redrawLines();
  }

  function redrawLines(){
    console.log(datad)
    var enabledLines = datad.filter(function(i) { return i.enabled; });

    console.log(enabledLines);
    var paths = svg.selectAll(".line").data(enabledLines);


    paths.enter()
         .append("path") 
         .merge(paths)  
         .attr("class", "line")
         .attr("d", function(d) {console.log(d); return line(d.item)})
         .style("stroke", function(d, i) { return colorScale(d.lineId); })
         .style("stroke-width", 2)
         .attr("fill", "none");
    paths.exit().remove();
  } 
}
