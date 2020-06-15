const { body } = document;
// Typescript 개발 팁
// 내가 만든 변수는 type을 선언하고
// 남이 만든 거는 기존 정의되어 있는 타입 추론을 그대로 사용한다.(package가 추후 업데이트 될 때 바뀔 수도 있으므로)
let candidate: number[];
let array: number[] = []; // 이때 실수로 number를 붙이지 않으면 빈 배열로 고정되서 .push()와 같은 배열 관련 동작이 수행되지 않는다. 반드시 number를 붙여주자.

function chooseNumber() { // 가급적이면 타입 추론이 자동으로 되도록 코드를 작성하자.(즉, 여기서는 void를 굳이 쓸 필요가 없다.)
  candidate = [1, 2, 3, 4, 5, 6, 7, 8 ,9];
  array = [];
  for (let i: number = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
}

chooseNumber();
console.log(array);

const result = document.createElement('h1');
body.append(result);
const form = document.createElement('form');
document.body.append(form);
const input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
const button = document.createElement('button');
button.textContent = '입력!';
form.append(button);

let wrongCount = 0;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const answer = input.value;
  if (answer === array.join('')) { // 답이 맞으면
    result.textContent = '홈런';
    input.value = '';
    input.focus();
    chooseNumber();
    wrongCount = 0;
  } else { // 답이 틀리면
    const answerArray = answer.split('');
    let strike = 0;
    let ball = 0;
    wrongCount += 1;
    if (wrongCount > 10) { // 10번 넘게 틀린 경우
      result.textContent = `10번 넘게 틀려서 실패! 답은 ${array.join(',')}였습니다.`;
      input.value = '';
      input.focus();
      chooseNumber();
      wrongCount = 0;
    } else { // 10번 미만으로 틀린 경우
      console.log('답이 틀리면', answerArray);
      for (let i = 0; i <= 3; i++) {
        if (Number(answerArray[i]) === array[i]) { // 같은 자리인지 확인
          console.log('같은 자리?');
          strike += 1;
        } else if (array.indexOf(Number(answerArray[i])) > -1) { // 같은 자리는 아니지만, 숫자가 겹치는 경우
          console.log('겹치는 숫자?');
          ball += 1;
        }
      }
      result.textContent = `${strike} 스트라이크 ${ball} 볼`;
      input.value = '';
      input.focus();
    }
  }
});


// interface 맛보기
interface hello {
  a: string;
  b?: number;
}

interface helloChild extends hello {
  c?: boolean;
}

type hello2 = {
  a: string;
  b?: number;
}

type stringOrNumber = string | number;

const sayHello: hello = { a: 'b'};
const sayHello2: hello2 = { a: 'b'};