const io = require("../lib/io");

function buildMDG(path = "", callback) {
  let namePattern = /([\w\.-_]+)/gm;
  let edgePattern = /^([\w\.-_]+)\s([\w\.-_]+)/gm;
  let graph = [];
  let modules = [];
  let edges = [];
  let rawData = "";

  io.readFile(path, (err, data) => {
    if (err)
      throw err;
    rawData = data.toString();
    edges = rawData.match(edgePattern);
    modules = rawData.match(namePattern);
    modules = modules.reduce(function (acc, curr) {
      if (acc.indexOf(curr) == -1)
        acc.push(curr);
      return acc;
    }, []);

    for (let i = 0; i < modules.length; i++) {
      graph.push(new Array(modules.length));
      for (let j = 0; j < modules.length; j++) {
        if (i === j) {
          graph[i][j] = 0;
          continue;
        }
        graph[i][j] = Number(
          (edges.indexOf(`${modules[i]} ${modules[j]}`) > -1) || (edges.indexOf(`${modules[j]} ${modules[i]}`) > -1)
        );
      }
    }

    callback({ modules: modules, graph: graph });

  });
}

module.exports = buildMDG;