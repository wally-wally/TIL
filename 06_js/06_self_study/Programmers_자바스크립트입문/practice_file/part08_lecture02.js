console.log("Menu");
console.log("1. Ice Americano");
console.log("2. Cafe Latte");
console.log("3. Cappuccino");
console.log("4. Tea");

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

console.log("안녕히 가십시오.");

// 예제. 각 달을 month라는 인자로 받아 그 달이 몇일까지 있는 반환하는 함수 작성
function solution( month ){
    // 이 때는 함수 내부에서 return으로 반환하므로 별도의 break는 굳이 없어도 된다.
    switch(month){
        case 1:
            return 31;
        case 2:
            return 28;
        case 3:
            return 31;
        case 4:
            return 30;
        case 5:
            return 31;
        case 6:
            return 30;
        case 7:
            return 31;
        case 8:
            return 31;
        case 9:
            return 30;
        case 10:
            return 31;
        case 11:
            return 30;
        case 12:
            return 31;
    }
}