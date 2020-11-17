window.onload = function() {
  let req = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
  req.onreadystatechange = function() { // onreadystatechange 이벤트 처리기
    if (req.readyState === 4) { // readyState 값이 4일 때 (즉, 응답이 수신 완료된 경우)
      if (req.status === 200) { // HTTP 상태 코드가 200 (즉, 올바르게 송수신 완료된 경우)
        document.querySelector('#app').innerText = req.responseText; // html 문서에 txt 파일에 있는 내용 보여주기
      }
    }
  };
  req.open('GET', './data.txt'); // 'GET' 방식으로 './data.txt'에 접근해서 데이터 통신 시작
  req.send(null);
}