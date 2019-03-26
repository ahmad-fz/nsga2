class Solution {
    constructor(chromosome = []) {
        this.chromosome = chromosome;
        this.dominatedSolutions = [];
        this.dominationCount = 0;
        this.rank = 0;
        this.crowdingDistance = 0;
    }
}

module.exports = Solution;

