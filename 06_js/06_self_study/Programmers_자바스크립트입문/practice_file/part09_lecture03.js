var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var i = 0; // 반복문 진입 전 실행될 초기 코드
while(i < array.length ){ // 조건식
    // 반복 실행될 코드
    console.log(array[i]);
    i++; // 반복문 코드가 한번 실행되고 나면 실행될 업데이트 구문
}

// for문의 경우 초기화 식은 언제든지 먼저 실행되고 조건식을 판단하여 { }안의 코드를 실행할 지 판단한다.
// for(초기화 식, 조건식, update 구문){
// }
for(var i = 0; i < array.length; i++){ // 조건식
    // 반복 실행될 코드
    console.log(array[i]);
}

// continue; 문을 만난 경우
// for문의 경우 : update 구문(i++)으로 이동하고 조건식으로 이동한다.
// while문의 경우 : 반복 실행 코드의 끝으로 이동한 다음, 바로 조건식을 검사한다.