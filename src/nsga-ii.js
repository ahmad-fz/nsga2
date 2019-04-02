const rand = require("../lib/rand");
const solution = require("./solution");
const selection = require("./selection");
const crossover = require("./crossover");
const mutation = require("./mutation");
const fastNondomSort = require("./fast-nondominated-sort");
const crowdingDist = require("./crowding-distance");

function nsga2(repeat, initPop, popSize, numberOfClusters, pC, pM, objectives) {
    let itr = 0;
    let parents = initPop.slice();
    let offsprings = [];
    let middlePop = [];
    let population = [];
    let fronts = [];

    offsprings = createOffsprings(parents, pC, pM, 1, numberOfClusters);

    while (itr <= repeat) {
        middlePop = [];
        population = [...parents, ...offsprings];
        
        calcObjectives(population, objectives);
        fronts = fastNondomSort(population, objectives);

        for (let i = 0; i < fronts.length; i++) {
            crowdingDist(fronts[i], objectives);
            fronts.forEach(front => {
                if (middlePop.length + front.length <= popSize) {
                    middlePop = [...middlePop, ...front];
                } else {
                    let emptySpace = popSize - middlePop.length;
                    let leastCrowded = front.sort((a, b) => b.crowdingDistance - a.crowdingDistance);
                    middlePop = [...middlePop, ...leastCrowded.slice(0, emptySpace)];
                }
            });
        }

        parents = selection.binaryTournament(middlePop, popSize);
        offsprings = createOffsprings(parents, pC, pM, 1, numberOfClusters);
        itr++;
    }

    return fronts;
}

function createOffsprings(pop = [], pC, pM, minValue, maxValue) {
    let pc = 0;
    let parent1 = {};
    let parent2 = {};
    let childs = [];

    for (let i = 0; i < pop.length; i++) {
        parent1 = pop[i];
        parent2 = pop.filter((elm, index) => index !== i)[rand(0, pop.length - 2)];
        pc = Math.random();
        if (pc <= pC)
            childs.push(new solution(crossover.flipCoin(parent1.chromosome, parent2.chromosome)));
        else
            childs.push(parent1);
        childs[i].chromosome = mutation(childs[i].chromosome, pM, minValue, maxValue);
    }
    return childs;
}

function calcObjectives(pop = [], objectives = []) {
    pop.forEach(sln => {
        let objVal = 0;
        sln.objectives = [];
        objectives.forEach(obj => {
            objVal = obj.func(sln.chromosome);
            sln.objectives.push(objVal);
        });
    })
}

module.exports = nsga2;