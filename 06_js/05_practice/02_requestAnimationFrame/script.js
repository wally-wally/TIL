const box = document.querySelector('.box');
const nowPosition = document.querySelector('.now-position');
let xPos = 0;
let cancel = 0;
let rafId;

const cancelAnimation = () => () => {
  if (!cancel) {
    cancelAnimationFrame(rafId);
    nowPosition.innerHTML = `<br>requestAnimationFrame 종료!`;
    cancel = 1;
  }
}

function render() {
  nowPosition.innerHTML = `현재 위치 : ${xPos}px`;
  box.style.transform = `translateX(${xPos}px)`;
  xPos += 10;

  rafId = requestAnimationFrame(render);

  if (xPos > 1200) {
    cancelAnimation()(); // 함수 안에 화살표 함수가 있으므로 이와 같이 작성
    // 또는 IIFE 형태로도 작성 가능
    // (cancelAnimation())();
  }
}

render();

window.addEventListener('click', cancelAnimation());
