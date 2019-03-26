const rand = require("../lib/rand");

function binaryTournament(pop = []) {    
    let a = {};
    let b = {};
    let newPopulation = [];

    for (let i = 0; i < pop.length; i++) {
        a = pop[rand(0, pop.length - 1)];
        b = pop[rand(0, pop.length - 1)];

        if (a.rank > b.rank) {
            newPopulation.push(a);
        } else if (a.rank < b.rank) {
            newPopulation.push(b);
        } else if (a.rank === b.rank) {
            if (a.crowdingDistance >= b.crowdingDistance) {
                newPopulation.push(a);
            } else {
                newPopulation.push(b);
            }
        }
    }

    return newPopulation;
}

module.exports = {
    binaryTournament: binaryTournament
}