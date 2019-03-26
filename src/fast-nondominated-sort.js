function fastNondominatedSort(pop) {
    front = new Array([]);
    pop.forEach((p, indexP) => {
        p.dominatedSolutions = [];
        p.dominationCount = 0;
        pop.forEach((q, indexQ) => {
            if (indexP === indexQ) continue;
            if (dominates(p, q)) {
                p.dominatedSolutions.push(q);
            } else {
                p.dominationCount++;
            }
        });
        if (p.dominationCount === 0) {
            p.rank = 1;
            front[0].push(p);
        }
    });

    let i = 0;
    while (front[i].length > 0) {
        let nextFront = [];
        front[i].forEach((p) => {
            p.dominatedSolutions.forEach((q) => {
                q.dominationCount--;
                if (q.dominationCount === 0) {
                    q.rank = i + 2;
                    nextFront.push(q);
                }
            });
        });
        i++;
        front.push(nextFront);
    }

    return front;
}

module.exports = fastNondominatedSort;