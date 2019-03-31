const buildMdg = require("./src/build-mdg");
const nsga2 = require("./src/nsga-ii");
const initPopulation = require("./src/init-population");
const initObjectives = require("./src/init-objectives");

let mdg = {};
let pop = [];
let objs = [];
let fronts = [];

buildMdg("./dataset/nos", (result) => {
  mdg = result;
  pop = initPopulation(35, mdg.modules.length, 1, 7);
  objs = initObjectives(mdg.graph);
  fronts = nsga2(1000, pop, 35, 7, 0.8, 0.1, objs);
  console.log(mdg.modules);
  fronts.forEach(f => {
    f.forEach(s => {
      console.log(`
        Rank = ${s.rank}
        coh  = ${objs[0].func(s.chromosome)} 
        cop  = ${objs[1].func(s.chromosome)} 
        mq   = ${objs[2].func(s.chromosome)} 
        clusters = [${s.chromosome}]`);
    })
  });
});

// cn   = ${objs[3].func(s.chromosome)} 
// dev  = ${objs[4].func(s.chromosome)}       