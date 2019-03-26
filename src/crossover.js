const rand = require("../lib/rand");

function cutPoint(parent1, parent2) {
    let crossoverPoint = rand(0, parent1.length - 1);
    let child = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint, parent2.length)];
    return child;
}

function flipCoin(parent1, parent2) {
    let coin = 0;
    let child = [];
    for (let i = 0; i < parent1.length; i++) {
        coin = Math.random();
        if (coin <= 0.5) {
            child[i] = parent1[i];
        } else {
            child[i] = parent2[i];
        }
    }
    return child;
}

module.exports = {
    cutPoint: cutPoint,
    flipCoin: flipCoin
}