const Solution = require("./solution");

/**
 * 
 * @param {Solution} a 
 * @param {Solution} b 
 * @param {Array} objectives 
 */
function isDominate(a, b, objectives = []) {

  let isMin = false;
  let aVal = 0;
  let bVal = 0;

  for (let i = 0; i < objectives.length; i++) {
    isMin = objectives[i].isMinimization();
    aVal = isMin ? a.objectives[i] : -a.objectives[i];
    bVal = isMin ? b.objectives[i] : -b.objectives[i];
    if (bVal < aVal)
      return false;
  }

  return true;
}

module.exports = isDominate;