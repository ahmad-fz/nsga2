const Objective = require("../../src/objective");
const fitnesses = require("../../src/fitness-functions");
const mdg = [
    [0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0],
];

test('cohesion [1, 1, 2, 1, 2, 3] should be 2', () => {
    let cohObj = new Objective(fitnesses[0], mdg, "max");
    let coh = cohObj.func([1, 1, 2, 1, 2, 3]);
    expect(coh).toBe(2);
});

test('coupling of [1, 1, 2, 1, 2, 3] should be 4', () => {
    let copObj = new Objective(fitnesses[1], mdg, "max");
    let cop = copObj.func([1, 1, 2, 1, 2, 3]);
    expect(cop).toBe(4);
});

test('MQ of [1, 1, 2, 1, 2, 3] should be 0.19', () => {
    let mqObj = new Objective(fitnesses[2], mdg, "max");
    let mq = mqObj.func([1, 1, 2, 1, 2, 3]);
    expect(mq).toBeCloseTo(0.19);
});

test('Cluster-Number of [1, 1, 2, 1, 2, 3] should be 3', () => {
    let clusNumObj = new Objective(fitnesses[3], mdg, "max");
    let clusNum = clusNumObj.func([1, 1, 2, 1, 2, 3]);
    expect(clusNum).toBe(3);
});

test('Std-Deviation of [1, 1, 2, 1, 2, 3] should be 0.47', () => {
    let stdDevObj = new Objective(fitnesses[4], mdg, "max");
    let stdDev = stdDevObj.func([1, 1, 2, 1, 2, 3]);
    expect(stdDev).toBeCloseTo(0.47);
});