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
    aVal = isMin ? objectives[i].func(a.chromosome) : -objectives[i].func(a.chromosome);
    bVal = isMin ? objectives[i].func(b.chromosome) : -objectives[i].func(b.chromosome);
    if (bVal < aVal)
      return false;
  }

  return true;
}

module.exports = isDominate;