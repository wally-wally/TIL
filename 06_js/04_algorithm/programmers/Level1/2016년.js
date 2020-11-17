function solution(a, b) {
    let answer = '';
    let day_of_week = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'];
    let day = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let total_day = 0;
    for (let i = 1; i < a; i++) {
        total_day += day[i - 1];
    }
    answer = day_of_week[(total_day + b) % 7];
    return answer;
}

console.log(solution(5, 24));
console.log(solution(1, 4));