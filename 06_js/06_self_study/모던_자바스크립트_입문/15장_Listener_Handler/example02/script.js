let divTags = document.querySelectorAll('div');

function showText(e) {
  console.log(e.currentTarget.className);
}

// (1) 이벤트 버블링 (capture: false)
// inner => inner-wrapper => outer 순서로 출력됨
divTags.forEach(elem => elem.addEventListener('click', showText))

// (2) 이벤트 캡쳐링 (capture: true)
// outer => inner-wrapper => inner 순서로 출력됨
divTags.forEach(elem => elem.addEventListener('click', showText, {capture: true}))