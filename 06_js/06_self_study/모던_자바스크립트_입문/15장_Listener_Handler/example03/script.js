let divTags = document.querySelectorAll('div');

function showText(e) {
  e.stopPropagation();
  console.log(e.currentTarget.className);
}

// (1) 이벤트 버블링 (capture: false)
// showText 함수에 e.stopPropagation(); 구문을 추가하면 console 창에 'inner'만 출력된다.
divTags.forEach(elem => elem.addEventListener('click', showText))

// (2) 이벤트 캡쳐링 (capture: true)
// showText 함수에 e.stopPropagation(); 구문을 추가하면 console 창에 'outer'만 출력된다.
divTags.forEach(elem => elem.addEventListener('click', showText, {capture: true}))