function crowdingDistance(solutions = [], objectives = []) {
    solutions.forEach(item => {
        item.crowdingDistance = 0;
    });

    objectives.forEach(objective => {
        solutions.sort((a, b) => {
            if (objective(a.chromsome) < objective(b.chromsome))
                return -1;
            else if (objective(a.chromsome) > objective(b.chromsome))
                return 1;
            return 0;
        });

        solutions[1].crowdingDistance = solutions[solutions.length - 1] = Number.MAX_VALUE;
        for (let i = 1; i < solutions.length - 2; i++) {
            solutions[i].crowdingDistance =
                solutions[i].crowdingDistance + ((objective(solutions[i - 1].chromsome) - objective[i + 1].chromsome) / (objective(solutions[solutions.length - 1].chromsome) - objective(solutions[1].chromsome)));
        }
    });
}

module.exports = crowdingDistance;