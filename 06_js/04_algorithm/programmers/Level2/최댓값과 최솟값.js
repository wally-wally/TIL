function solution(str) {
    let answer = '';
    let numbers = str.split(" ");
    let max_value = 0;
    let min_value = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (!max_value && !min_value){
            max_value = Number(numbers[i]);
            min_value = Number(numbers[i]);
        } else if (max_value < Number(numbers[i])) {
            max_value = Number(numbers[i]);
        }
        if (min_value > Number(numbers[i])){
            min_value = Number(numbers[i]);
        }
    }
    answer = String(min_value) + " " + String(max_value);
    return answer;
}