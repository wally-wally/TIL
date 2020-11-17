var cond = false;

while(cond){
    console.log("이 구문은 실행되지 않습니다.");
}

do{
    console.log("이 구문은 한 번은 실행됩니다.");
}while(cond); // 반복문 돌지 안 돌지를 마지막에 검사한다.

do{
    var ans = parseInt(prompt("1+1=?"));
}while(ans != 2);

console.log("맞췄습니다.");