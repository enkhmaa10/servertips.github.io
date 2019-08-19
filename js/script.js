const $tips = d3.select(`#tips`);  
const width = 500;    
const height = 300;   


const graphData = (tps) => {

  const length = tps.length;  
  const high = d3.max(tps, t => t.tips);  
  const low = d3.min(tps, t => t.tips);   
  const highLow = d3.extent(tps, t => t.tips);   


  const yAxis = d3.scaleLinear()
    .domain(highLow)
    .range([ height, 0 ]);

  const yScale = d3.axisLeft(yAxis).ticks(high-low);


  $tips.append(`g`)
    .attr(`transform`, `translate(-2, 0)`)
    .call(yScale)

  const createLine = d3.line()
    .x( t => t.months * (width/(length-1)) - (width/(length-1)) )
    .y( t => height - (t.tips - low) * (height / (high - low)) );
  
  

  $tips.append(`path`)           
    .attr(`d`, createLine(tps))     
    .classed(`line`, true)          
    .on('click', (d, i) => {
      console.log(d, i)
    });
  
}


d3.json(`data/tips.json`).then(tps => {
  
  graphData(tps)

})