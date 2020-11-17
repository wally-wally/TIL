// 1. 일반적인 방법(for문)
function solution(seoul) {
    for (let i = 0; i < seoul.length; i++){
        if (seoul[i] == "Kim"){
            return "김서방은 "+i+"에 있다";
        }
    }
}

// 2. indexOf() 메서드 사용
function solution(seoul) {
    return "김서방은 "+seoul.indexOf("Kim")+"에 있다"; // 어차피 Kim은 반드시 나오고 하나 밖에 없으므로 indexOf() 써도 된다.
}