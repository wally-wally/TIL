// DOM에 엘리먼트 렌더링하는 가장 기본적이 방법
// const element = <h1>Hello, world</h1>;
// ReactDOM.render(element, document.getElementById('root'));

// 변경된 부분만 업데이트
// 매초 전체 UI를 다시 그리도록 엘리먼트를 만들었지만 
// React DOM은 내용이 변경된 텍스트 노드만 업데이트함
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  // highlight-next-line
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);