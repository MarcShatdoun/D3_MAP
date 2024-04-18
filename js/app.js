// prueba
//d3.select('#chart').text("hola")

const margin = 30
const width = 1000
const height = 500
const rValues = [3, 41]
const colorsContinents = [
    'darkgreen', 'purple', 'darkblue', 'orange', 'darkred', 'steelblue', 'pink'
];


let circles, xScale, yScale, rScale, cScale;


const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

d3.csv("data/world_2000.csv")
.then( data => {//console.log(data)

data = data.sort((a,b) => b.surfacearea - a.surfacearea)

    //d3 para encontrar los valores minumos y maximos 
    let xMinMax = d3.extent(data, d => parseFloat(d.income))
    //console.log(xMinMax);
    let yMinMax = d3.extent(data, d => parseFloat(d.lifeexpectancy))
    let rMinMax = d3.extent(data, d => parseFloat(d.population))
//console.log(rMinMax);


// fijar las escalas del grafico
    xScale = d3.scaleLinear()
    .domain([xMinMax[0], xMinMax[1]])
    .range([margin + rValues[1], width - margin - rValues[1]])

    yScale = d3.scaleLinear()
    .domain([yMinMax[1], yMinMax[0]])
    .range([margin + rValues[1], height - margin - rValues[1]])

    rScale = d3.scaleLinear()
    .domain([rMinMax[0], rMinMax[1]])
    .range(rValues)

    cScale = d3.scaleOrdinal()
    .domain([0, 6]).range(colorsContinents)


    circles = svg.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(parseFloat(d.income)))
    .attr('cy', d => yScale(parseFloat(d.lifeexpectancy)))
    .attr('r', d => rScale(parseInt(d.population)))
    .attr('fill', d => cScale(d.continent))
    .on("mouseover", (event) => {
        // console.log(event.toElement.__data__.country)
        let info = event.toElement.__data__
        let tooltip = "Country : " + info.country + "<br/>";
         tooltip += " X : Income: " + info.income + "<br/>";
         tooltip += " Y : Lifeexpectancy: " + info.lifeexpectancy + "<br/>";
         tooltip += " R : Population: " + info.population + "<br/>";
         tooltip += " C : Contient: " + info.continent + "<br/>";

         d3.select("#tooltip")
         .html(tooltip)
         .style("left", (event.pageX) + 10 + "px")
         .style("top", (event.pageY) + 10 + "px")
         .style("opacity", 0.85)
    })
    .on("mouseout", () => {
        d3.select("#tooltip")
        .style("opacity", 0)
    });
    let xAxis = d3.axisBottom(xScale).tickValues([xMinMax[0],(xMinMax[0] + xMinMax[1])/2 ,xMinMax[1]]);

    let xAxisG = svg.append("g").attr("id", "xAxis").attr("class", "axis");
  
    xAxisG.call(xAxis).attr("transform", "translate(0," + (height-margin) + " )")


    let yAxis = d3.axisLeft(yScale).tickValues([ yMinMax[0], (yMinMax[0] + yMinMax[1])/2, yMinMax[1] ]);

    let yAxisG = svg.append("g").attr("id", "yAxis").attr("class", "axis ");
  
    yAxisG.call(yAxis).attr("transform", "translate(" + margin + ",  0)")
  
  });