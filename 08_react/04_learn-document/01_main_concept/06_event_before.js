// react의 이벤트는 camelCase를 사용함
// JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달함

// 일반적인 HTML에서는 return false; 구문으로 기본 동작을 방지할 수 있지만,
// react에서는 불가능하므로 반드시 preventDefault를 명시적으로 호출해야 한다.

class Toggle extends React.Component {
  // before

  // [this 바인딩 해결 방법]
  // (1) construcotr 메소드 내에 bind() 메소드로 해당 함수에 this 바인딩
  // this.handleClick = this.handleClick.bind(this);
  
  // (2) onClick에 함수 전달시 단순 함수 형태 this.handleClick이 아닌
  // () => this.handleClick() 형태로 전달하기
  // onClick={() => this.handleClick()}

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // (1) 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 한다.
    // 이 동작을 하지 않으면 onClick에 그대로 전달하고 함수가 실제 호출될 때 this는 undefined가 된다.
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  // (2) onClick 이벤트 핸들러 콜백에 화살표 함수를 사용
  // 이 방법을 사용할 때는 onClick={this.handleClick}와 같이 작성하면 안 되고
  // this가 handleClick 내에서 바인딩되도록 onClick={() => this.handleClick()}와 같이 작성해야 한다.
  render() {
    return (
      <button onClick={() => this.handleClick()}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }

  // 위와 같은 문법의 문제점은 Toggle 컴포넌트가 렌더링될 때마다 다른 콜백이 생성된다는 것이다.
  // 대부분의 경우 문제가 되지 않으나, 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있다.
  // 이러한 종류의 성능 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장합니다.
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);