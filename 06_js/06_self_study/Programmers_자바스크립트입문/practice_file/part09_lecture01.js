console.log("Menu");
console.log("1. Ice Americano");
console.log("2. Cafe Latte");
console.log("3. Cappuccino");
console.log("4. Tea");

var count = 0;

while (count < 3){
    var choice = parseInt(prompt("메뉴를 선택해 주세요"));

    console.log(choice+"번 메뉴를 선택하셨습니다.");

    switch(choice){
        case 1:
            console.log("아이스 아메리카노 : 1500원");
            break;
        case 2: // 이 때 2를 입력하면 break가 없기 때문에 카페 라떼와 break를 만나는 카푸치노 두 구문이 출력된다.
            console.log("카페 라떼 : 1800원");
            // break;
        case 3:
            console.log("카푸치노 : 2000원");
            break;
        case 4:
            console.log("홍차 : 1300원");
            break;
        default:
            console.log("죄송합니다. 그런 메뉴는 없습니다.");
            break;
    }
    count++;
}

console.log("안녕히 가십시오.");

var count = 0;

while(true){
    var ans;
    ans = parseInt(prompt("1+1=?"));
    if(ans != 2){
        console.log((++count) + "번 틀렸습니다. 다시 도전하세요.");
        continue;
    }

    ans = parseInt(prompt("9*7=?"));
    if(ans != 63){
        console.log((++count) + "번 틀렸습니다. 다시 도전하세요.");
        continue;
    }
    break;
    // continue를 만나면 여기로 이동한다.
}
// break를 만나면 여기로 이동한다.

console.log("참 잘했습니다.");