const rand = require("../lib/rand");
const solution = require("./solution");
const selection = require("./selection");
const crossover = require("./crossover");
const mutation = require("./mutation");
const fastNondomSort = require("./fast-nondominated-sort");
const crowdingDist = require("./crowding-distance");

function nsga2(repeat, initPop, popSize, pC, pM) {
    let itr = 0;
    let parents = initPop;
    let offsprings = [];
    let middlePop = [];
    let population = [];
    let fronts = [];

    offsprings = createOffsprings(parents, pC, pM);

    while (itr <= repeat) {
        population = [...parents, ...offsprings];
        fronts = fastNondomSort(population);

        for (let i = 0; i < fronts.length; i++) {
            crowdingDist(fronts[i], []);
            fronts.forEach((front, index) => {
                if (middlePop.length + front.length <= popSize) {
                    middlePop = [...middlePop, ...front];
                } else {
                    let emptySpace = popSize - middlePop.length;
                    let leastCrowded = front[i].sort((a, b) => b.crowdingDistance - a.crowdingDistance);
                    middlePop = [...middlePop, leastCrowded.slice(0, emptySpace - 1)];
                }
            });
        }

        parents = selection.binaryTournament(middlePop);
        offsprings = createOffsprings(parents, pC, pM);
        itr++;
    }

    return fronts;
}

function createOffsprings(pop = [], pC, pM) {
    let pc = 0;
    let parent1 = {};
    let parent2 = {};
    let childs = [];

    for (let i = 0; i < pop.length; i++) {
        parent1 = pop[i];
        parent2 = pop.filter((elm, index) => index !== i)[rand(0, pop.length - 2)];
        pc = Math.random();
        if (pc <= pC)
            childs.push(new solution(crossover.flipCoin(parent1, parent2)));
        else
            this.childs.push(parent1);
        pop[i].chromsome = mutation(pop[i].chromsome, pM);
    }
    return childs;
}

module.exports = nsga2;