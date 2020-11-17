function solution(str) {
    let string_length = str.length;
    let answer = string_length % 2 === 1 ? str.charAt(string_length / 2) : str.substr((string_length / 2) - 1, 2);
    return answer;
}