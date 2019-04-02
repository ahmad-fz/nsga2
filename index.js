const buildMdg = require("./src/build-mdg");
const nsga2 = require("./src/nsga-ii");
const initPopulation = require("./src/init-population");
const initObjectives = require("./src/init-objectives");
const io = require("./lib/io");
const createDot = require("./util/create-dot");

let mdg = {};
let pop = [];
let objs = [];
let fronts = [];

console.log("Reading dataset ...");
buildMdg("./dataset/nos", (result) => {
  
  mdg = result;
  pop = initPopulation(70, mdg.modules.length, 1, 7);
  objs = initObjectives(mdg.graph);

  console.log("Runing NSGA-II ...");
  fronts = nsga2(5000, pop, 70, 7, 0.8, 0.1, objs);

  console.log("Creating dot files ...");
  let dot = createDot(mdg.modules, mdg.graph, fronts[0][0].chromosome);
  io.createFile("./output/output.dot", dot, (err) => {
    if (err) console.log(err);
    console.log("Dot files fineshed ...")
  });



});

