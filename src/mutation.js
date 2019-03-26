const rand = require("../lib/rand");

function mutation(chromosome, pM, minValue, maxValue) {
    let prob = 0;
    return chromosome.map((curr, index) => {
        prob = Math.random();
        if (prob <= pM) {
            return rand(minValue, maxValue);
        } else {
            return curr;
        }
    });
}

module.exports = mutation;