window.onload = function() {
  let req = new XMLHttpRequest();
  // 통신 중일 때
  req.addEventListener('loadstart', function() {
    document.querySelector('#app').innerText = '데이터 통신 중입니다. 조금만 기다려주세요.';
  })
  // 요청 성공해서 응답을 가져올 수 있을 때
  req.addEventListener('load', function() {
    document.querySelector('#app').innerText = req.responseText;
  })
  // 데이터 송수신시 오류 발생했을 때
  req.addEventListener('error', function() {
    document.querySelector('#app').innerText = '오류가 발생했습니다.';
  })
  req.open('GET', './data.txt');
  req.send(null);
}