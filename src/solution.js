class Solution {
    constructor(chromosome = []) {
        this.rank = 0;        
        this.dominationCount = 0;        
        this.crowdingDistance = 0;
        this.dominatedSolutions = [];
        this.chromosome = chromosome;
    }
}

module.exports = Solution;

