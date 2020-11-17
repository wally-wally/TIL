function solution(n) {
    let answer = 1;
    let end = parseInt(n / 2) + 1;
    let sum_value;
    for (let i = 1; i < end; i++) {
        sum_value = i;
        for (let j = i + 1; j <= end && sum_value < n; j++) {
            sum_value += j;
            if (sum_value === n) {
                answer += 1;
            }
        }
    }
    return answer;
}