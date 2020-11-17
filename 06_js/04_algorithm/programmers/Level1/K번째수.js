function solution(array, commands) {
    let answer = [];
    for (let i = 0; i < commands.length; i++) {
        let subset = [];
        for (let j = commands[i][0] - 1; j < commands[i][1]; j++) {
            subset.push(array[j]);
        }
        let sorted_subset = subset.sort(function(a, b){return a - b;});
        answer.push(sorted_subset[commands[i][2] - 1]);
    }
    return answer;
}