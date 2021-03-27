class Clock extends React.Component {
  // 실무에서는 constructor 방식을 잘 사용하지 않는다고 한다.
  // constructor(props) {
  //   super(props);
  //   this.state = {date: new Date()};
  // }

  state = {
    date: new Date(),
    result: 123,
    value: 'wow',
  }

  // 처음으로 렌더링 후 실행되는 메서드(컴포넌트 출력물이 DOM에 렌더링 된 후에 실행)
  // Vue.js의 mouunted hook과 유사함
  // 이 안에서 JS 라이브러리나 프레임워크의 함수를 호출하거나 setTimout, setInterval, 네트워크 요청 같은 비동기 작업을 처리한다.
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // 컴포넌트를 DOM에서 제거할 때 실행
  // Vue.js의 beforeDestroy hook과 유사함
  // componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거를 해야 한다.
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // 직접 this.state에 접근해서 state를 수정하면 안 되고 setState() 메소드를 호출해서 state를 변경해야 한다.
    this.setState({
      date: new Date()
    });

    // [참고] this.props와 this.state가 비동기적으로 업데이트될 수 있으므로 다음 state를 계산해서 보여줄 때는 해당 값에 의존하면 안 된다.
    // 즉, 첫 번째 인자인 이전 state와 두 번째 인자인 업데이트가 적용된 시점의 props를 사용해야 한다.
    // ex) setState 내부 구현 코드를 함수를 return하는 형태로 작성하면 이전 state 값을 사용해서 새로운 state 값을 만들 수 있다.
    // this.setState((prevState, props) => {
    //   return {
    //     date: new Date(),
    //     result: `value값 출력: ${prevState.value}`,
    //   }
    // })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);