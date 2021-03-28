const mountNode = document.getElementById('root');
// 제어 컴포넌트에 value prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없다.
// value를 설정했는데 여전히 수정할 수 있다면 value를 undefined나 null로 설정했을 수 있다.

// ex) 첫 번째 입력을 잠겨있지만 5초 후 입력이 가능해진다.
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 5000);