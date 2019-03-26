const getObjectives = require("../../src/objectives");
const objectives = getObjectives([
    [0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0],
]);

test('cohesion [1, 1, 2, 1, 2, 3] should be 2', () => {
    let cohFunc = objectives[0];
    let coh = cohFunc([1, 1, 2, 1, 2, 3]);
    expect(coh).toBe(2);
});

test('coupling of [1, 1, 2, 1, 2, 3] should be 4', () => {
    let copFunc = objectives[1];
    let cop = copFunc([1, 1, 2, 1, 2, 3]);
    expect(cop).toBe(4);
});

test('MQ of [1, 1, 2, 1, 2, 3] should be 0.19', () => {
    let mqFunc = objectives[2];
    let mq = mqFunc([1, 1, 2, 1, 2, 3]);
    expect(mq).toBeCloseTo(0.19);
});

test('Cluster-Number of [1, 1, 2, 1, 2, 3] should be 3', () => {
    let clusterNum = objectives[3];
    let clusNum = clusterNum([1, 1, 2, 1, 2, 3]);
    expect(clusNum).toBe(3);
});

test('Std-Deviation of [1, 1, 2, 1, 2, 3] should be 0.47', () => {
    let stdDevFunc = objectives[4];
    let stdDev = stdDevFunc([1, 1, 2, 1, 2, 3]);
    expect(stdDev).toBeCloseTo(0.47);
});