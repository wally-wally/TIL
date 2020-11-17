let buttonOne = document.querySelector('#btn1');
let buttonTwo = document.querySelector('#btn2');
let buttonThree = document.querySelector('#btn3');

// 이벤트 리스너 등록
buttonOne.addEventListener('click', showAlert, false);

// 이벤트 리스너 등록 또는 삭제할 때 콜백 함수를 화살표 함수로 작성할 수 있다.
buttonTwo.addEventListener('mouseover', () => {
  buttonTwo.style.opacity = 0.5;
})
buttonTwo.addEventListener('mouseout', () => {
  buttonTwo.style.opacity = 1;
})

buttonThree.addEventListener('click', () => {
  document.querySelector('.alert-message').innerText = '버튼1의 이벤트 리스너 삭제됨!';
  buttonOne.removeEventListener('click', showAlert, false);
})

function showAlert(e) {
  alert(`${e.currentTarget.innerText}이 눌렸습니다!`);
}