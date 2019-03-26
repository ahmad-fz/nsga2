const rand = require("./lib/rand");
const crossover = require("./src/crossover");
const mutation = require("./src/mutation");
const getObjectives = require("./src/objectives");

let objs = getObjectives([
    [0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0],
]);

let mqFunc = objs[2];
let mq = mqFunc([1, 1, 2, 1, 2, 3]);
console.log(mq);
