var MDG = [];

/**
 * Returns array of objective functions.
 * @param {Array} mdg Adjacency matrix of module dependency graph.
 * @returns {Array} Array of objective functions.
 */
function getObjectives(mdg = []) {
    if (mdg.length === 0) throw new Error("MDG should be initialised.");
    MDG = mdg;
    return [
        clusteringCohesion,
        clusteringCoupling,
        clusteringMQ,
        numberOfClusters,
        clusterSizeStdDev
    ];
}

function clusteringCohesion(chromosome = []) {
    let cohesion = 0;

    for (let row = 0; row < MDG.length; row++) {
        for (let col = row + 1; col < MDG.length; col++) {
            if (MDG[row][col] === 1 && chromosome[row] === chromosome[col])
                cohesion++;
        }
    }

    return cohesion;
}

function clusteringCoupling(chromosome = []) {
    let coupling = 0;

    for (let row = 0; row < MDG.length; row++) {
        for (let col = row + 1; col < MDG.length; col++) {
            if (MDG[row][col] === 1 && chromosome[row] !== chromosome[col])
                coupling++;
        }
    }

    return coupling;
}

function clusteringMQ(chromosome = []) {
    let mq = 0;
    let cohesion = 0;
    let coupling = 0;
    let clusters = getClusterList(chromosome);
    let clusterCount = Object.keys(clusters).length;

    Object.keys(clusters).forEach(key => {
        cohesion = getClusterCohesion(chromosome, Number(key));
        coupling = getClusterCoupling(chromosome, Number(key));
        mq += cohesion / (cohesion + 0.5 * coupling);
    });

    return (1 / clusterCount) * mq;
}

function numberOfClusters(chromosome = []) {
    let clusters = {};
    clusters = getClusterList(chromosome);
    return Object.keys(clusters).length;
}

function clusterSizeStdDev(chromosome = []) {
    let mean = 0;
    let variance = 0;
    let moduleCount = 0;
    let clusterCount = 0;
    let clusters = getClusterList(chromosome);

    moduleCount = chromosome.length;
    clusterCount = Object.keys(clusters).length;
    mean = moduleCount / clusterCount;

    Object.keys(clusters).forEach(key => {
        variance += Math.pow((clusters[key] - mean), 2);
    });

    return (1 / clusterCount) * Math.sqrt(variance);
}

//======== Helper functions ==========

function getClusterCohesion(chromosome = [], clusterNumber = 0) {
    let cohesion = 0;

    for (let row = 0; row < MDG.length; row++) {
        if (chromosome[row] !== clusterNumber) continue;
        for (let col = row + 1; col < MDG.length; col++) {
            if (MDG[row][col] === 1 && chromosome[row] === chromosome[col])
                cohesion++;
        }
    }

    return cohesion;

}

function getClusterCoupling(chromosome = [], clusterNumber = 0) {
    let coupling = 0;

    for (let row = 0; row < MDG.length; row++) {
        //if (chromosome[row] === clusterNumber) continue;
        for (let col = row + 1; col < MDG.length; col++) {
            if (MDG[row][col] === 1 && chromosome[row] !== chromosome[col] && (chromosome[row] === clusterNumber || chromosome[col] === clusterNumber))
                coupling++;
        }
    }

    return coupling;
}

function getClusterList(chromosome = []) {
    let list = {};

    list = chromosome.reduce(function (acc, cur) {
        if (cur in acc) {
            acc[cur]++;
        } else {
            acc[cur] = 1;
        }
        return acc;
    }, {});

    return list;
}


module.exports = getObjectives;