function solution(s) {
    let answer = true;
    if (s.length == 4 || s.length == 6) {
        for (let i = 0; i < s.length; i++) {
            let ascii_value = s[i].charCodeAt(0);
            if (ascii_value < 48 || ascii_value > 57){
                answer = false;
                break;
            }
        }
    } else {
        answer = false;
    }
    return answer;
}