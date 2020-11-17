function solution(str) {
    let answer = '';
    let str_array = str.split(" ");
    let word_cnt = str_array.length;
    for (let i = 0; i < word_cnt; i++) {
        for (let j = 0; j < str_array[i].length; j++) {
            answer += (j % 2 === 0 ? str_array[i][j].toUpperCase() : str_array[i][j].toLowerCase())
        }
        if (i !== word_cnt - 1) {
            answer += ' ';
        }
    }
    return answer;
}