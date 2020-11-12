// 타입 단언(type assertion)
// 타입스크립트 자체적으로 타입을 추론하는 것 대신에
// 개발자가 임의로 해당 변수에 타입을 지정하는 방식
var a;
a = 20;
a = 'text'
var b = a as string;

// ex)DOM API 조작
// (address-book pjt에 이어서 작성)
var div = document.querySelector('div');
if (div) {
  div.innerText
}