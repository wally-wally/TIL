var createReactClass = require('create-react-class');

var Greeting = createReactClass({
  // props 기본값 선언
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },

  // 초기 state 정의
  getInitialState: function() {
    return {count: this.props.initialCount};
  },

  // ES6 class로서 선언된 React 컴포넌트에서 메소드는 .bind(this)로 this를 바인딩해줘야 했다.
  // 반면 createReactClass()를 사용한다면, 알아서 모든 메서드를 바인딩하기 때문에 이 과정이 필요하지는 않습니다.
  handleClick: function() {
    alert(this.state.message);
  },
  
  // render
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});

ReactDOM.render(
  <Greeting />,
  document.getElementById('root')
);