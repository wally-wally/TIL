function solution(arr, divisor) {
    let select_num = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % divisor === 0) {
            select_num.push(arr[i]);
        }
    }
    if (select_num.length === 0) {
        select_num.push(-1);
    }
    let answer = select_num.sort((a, b) => a - b );
    return answer;
}