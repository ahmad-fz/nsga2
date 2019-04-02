
function createDot(moduleList = [], mdg = [], chromosome = [], width = 1000, height = 1000, rotate = 0) {
  let data = `
/*-----------------------------------------*/
/* Software Module Clustering With NSGA-II */
/* Author: Ahmad-Fz                        */
/*-----------------------------------------*/
digraph G {
size= "${width},${height}";
rotate = ${rotate};
${ addSubGraphs(chromosome, moduleList)}
${ addNodesConnections(mdg, moduleList)}
}`;

  return data;
}

function addSubGraphs(chromosome = [], moduleList = []) {
  let clusterNum = 0;
  let clusters = getClusterList(chromosome);
  let modules = [];

  let strSubGraph = "";
  let strModules = "";

  Object.keys(clusters).forEach(key => {
    key = Number(key);
    modules = getClusterModules(key, chromosome, moduleList);

    modules.forEach(item => {
      strModules += `"${item}"[label="${item}",shape=ellipse,color=lightblue,fontcolor=black,style=filled];\r\n`;
    });

    strSubGraph += `
subgraph cluster${clusterNum} {
label = "Cluster::${clusterNum + 1}";
color = black;
style = bold;
    
${strModules}
}\r\n`;
    clusterNum++;
  });

  return strSubGraph;
}

function addNodesConnections(mdg = [], modulesList = []) {
  let edges = "";

  for (let row = 0; row < mdg.length; row++) {
    for (let col = row + 1; col < mdg.length; col++) {
      if (mdg[row][col] === 1)
        edges += `"${modulesList[row]}" -> "${modulesList[col]}" [color=blue,font=6,arrowhead=none];\r\n`;
    }
  }

  return edges;

}

function getClusterList(chromosome = []) {
  return chromosome.reduce(function (acc, cur) {
    if (cur in acc) {
      acc[cur]++;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});
}

function getClusterModules(clusterNumber, chromosome = [], modulesList = []) {
  let modules = [];
  chromosome.forEach((item, index) => {
    if (item === clusterNumber)
      modules.push(modulesList[index]);
  });
  return modules;
}

module.exports = createDot;