function crowdingDistance(solutions = [], objectives = []) {
    let zMin = 0;
    let zMax = 0;

    try {

        if (solutions.length === 0)
            return;

        solutions.forEach(item => {
            item.crowdingDistance = 0;
        });

        objectives.forEach(obj => {
            solutions.sort((a, b) => {
                if (obj.func(a.chromosome) < obj.func(b.chromosome))
                    return -1;
                else if (obj.func(a.chromosome) > obj.func(b.chromosome))
                    return 1;
                return 0;
            });

            zMin = obj.func(solutions[0].chromosome);
            zMax = obj.func(solutions[solutions.length - 1].chromosome);
            solutions[0].crowdingDistance = solutions[solutions.length - 1].crowdingDistance = Number.MAX_VALUE;

            if (solutions.length <= 2) return;

            for (let i = 1; i < solutions.length - 1; i++) {
                solutions[i].crowdingDistance = solutions[i].crowdingDistance + (
                    (obj.func(solutions[i - 1].chromosome) - obj.func(solutions[i + 1].chromosome)) / (zMax - zMin)
                );
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = crowdingDistance;