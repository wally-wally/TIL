if ( true ){
    // 항상 조건식이 참이므로 중괄호 안의 코드가 실행됨
    console.log("이 구문은 실행 됩니다.");
}

if ( false ){
    // 항상 조건식이 거짓이므로 중괄호 안의 코드가 실행되지 않음
    console.log("이 구문은 실행되지 않습니다.");
}

if ( false ){
    console.log("1");
}
else{
    console.log("2");
}

// 예제. 아래 구문을 실행하면 콘솔 창에서 어떤 값이 출력될까?
var num = 2, str = "Hello";
var judge1 = true && false
var judge2 = num % 2 || str.length > num * 2;

if ( judge1 == true ){
    console.log("1");
}
else if( !judge2 ){
    console.log("2");
}
else if( judge1 && judge2 ){
    console.log("3");
}
else{
    console.log("4");
}