function solution(s, n) {
    let answer = ''
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ' ') { // 공백인 경우
            answer += s[i]
            continue
        }
        let ascii = s.charCodeAt(i)
        let change_ascii = ascii + n
        if (ascii >= 65 && ascii <= 90) { // 대문자인 경우
            if (change_ascii >= 91){
                change_ascii -= 26
            }
            answer += String.fromCharCode(change_ascii)
        } else if (ascii >= 97 && ascii <= 122) { // 소문자인 경우
            if (change_ascii >= 123) {
                change_ascii -= 26
            }
            answer += String.fromCharCode(change_ascii)
        }
    }
    return answer
}