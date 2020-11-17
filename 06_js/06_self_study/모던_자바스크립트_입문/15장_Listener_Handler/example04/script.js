let submitBtn = document.querySelector('button');
let name = document.querySelector('input');

// e.preventDefault(); 구문을 주석 처리하면 form 태그의 기본 동작인 새로고침이 수행된다.
// e.preventDefault(); 구문을 추가하면 새로고침이 되지 않고 input 태그의 안의 값과 console창에 출력되는 값도 보존된다.
submitBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log(name.value);
})