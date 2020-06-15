var body = document.body;
// 내가 만든 변수는 type을 선언하고
// 남이 만든 거는 기존 정의되어 있는 타입 추론을 그대로 사용한다.(package가 추후 업데이트 될 때 바뀔 수도 있으므로)
var candidate;
var array = []; // 이때 실수로 number를 붙이지 않으면 빈 배열로 고정되서 .push()와 같은 배열 관련 동작이 수행되지 않는다. 반드시 number를 붙여주자.
function chooseNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array = [];
    for (var i = 0; i < 4; i++) {
        var chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
}
chooseNumber();
console.log(array);
var result = document.createElement('h1');
body.append(result);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
var button = document.createElement('button');
button.textContent = '입력!';
form.append(button);
var wrongCount = 0;
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var answer = input.value;
    if (answer === array.join('')) { // 답이 맞으면
        result.textContent = '홈런';
        input.value = '';
        input.focus();
        chooseNumber();
        wrongCount = 0;
    }
    else { // 답이 틀리면
        var answerArray = answer.split('');
        var strike = 0;
        var ball = 0;
        wrongCount += 1;
        if (wrongCount > 10) { // 10번 넘게 틀린 경우
            result.textContent = "10\uBC88 \uB118\uAC8C \uD2C0\uB824\uC11C \uC2E4\uD328! \uB2F5\uC740 " + array.join(',') + "\uC600\uC2B5\uB2C8\uB2E4.";
            input.value = '';
            input.focus();
            chooseNumber();
            wrongCount = 0;
        }
        else { // 10번 미만으로 틀린 경우
            console.log('답이 틀리면', answerArray);
            for (var i = 0; i <= 3; i++) {
                if (Number(answerArray[i]) === array[i]) { // 같은 자리인지 확인
                    console.log('같은 자리?');
                    strike += 1;
                }
                else if (array.indexOf(Number(answerArray[i])) > -1) { // 같은 자리는 아니지만, 숫자가 겹치는 경우
                    console.log('겹치는 숫자?');
                    ball += 1;
                }
            }
            result.textContent = strike + " \uC2A4\uD2B8\uB77C\uC774\uD06C " + ball + " \uBCFC";
            input.value = '';
            input.focus();
        }
    }
});
var sayHello = { a: 'b' };
var sayHello2 = { a: 'b' };
