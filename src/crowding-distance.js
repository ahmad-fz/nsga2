function crowdingDistance(solutions = [], objectives = []) {
    let zMin = 0;
    let zMax = 0;

    if (solutions.length === 0)
        return;

    solutions.forEach(item => {
        item.crowdingDistance = 0;
    });

    objectives.forEach((obj, index) => {
        solutions.sort((a, b) => {
            return a.objectives[index] - b.objectives[index];
        });

        zMin = solutions[0].objectives[index];
        zMax = solutions[solutions.length - 1].objectives[index];
        solutions[0].crowdingDistance = solutions[solutions.length - 1].crowdingDistance = Number.MAX_VALUE;
        
        for (let i = 1; i < solutions.length - 1; i++) {
            solutions[i].crowdingDistance = solutions[i].crowdingDistance + (
                (solutions[i - 1].objectives[index] - solutions[i + 1].objectives) / (zMax - zMin)
            );
        }
    });
}

module.exports = crowdingDistance;