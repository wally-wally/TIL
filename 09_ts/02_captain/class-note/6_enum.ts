// 숫자형 이넘
enum Shoes {
  Nike, // 0
  Adidas // 1
}

var myShoes = Shoes.Nike;
// enum은 별도의 값을 지정하지 않으면 숫자 데이터가 지정된다.
console.log(myShoes); // 0


// 문자형 이넘
enum Members {
  User1 = 'wally',
  User2 = 'wow'
}

var member = Members.User1;
console.log(member); // 'wally'


// 예제
// 드롭다운 등의 목록 형태에서 enum을 정의해서 쓰면 좋다.
// 그리고 예외처리와 같은 케이스들이 줄어든다는 이점이 있다.
enum Answer {
  Yes = 'Y',
  No = 'N',
}

function askQuestion(answer: Answer) {
  if (answer === Answer.Yes) {
    console.log('정답!');
  }
  if (answer === Answer.No) {
    console.log('오답!');
  }
}
askQuestion(Answer.Yes); // enum에서 제공되는 값만 인자로 넘길 수 있다.