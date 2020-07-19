import React, { Component } from 'react';

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  }

  myRef = null; // ref를 설정할 부분

  constructor(props) {
    super(props);
    console.log('constructor');
  }


  // props로 받아 온 값을 state에 동기화시키는 용도(ptops의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용)
  // 컴포넌트가 mount될 때와 update될 때 호출됨
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    if (nextProps.color !== prevState.color) { // 조건에 따라 특정 값 동기화
      return { color: nextProps.color };
    }
    return null; // state 변경할 필요가 없으면 null 반환
  }


  // 처음으로 렌더링 후 실행되는 메서드
  // 이 안에서 JS 라이브러리나 프레임워크의 함수를 호출하거나 setTimout, setInterval, 네트워크 요청 같은 비동기 작업을 처리한다.
  componentDidMount() {
    console.log('componentDidMount');
  }


  // props 또는 state를 변경했을 때 re-rendering을 시작할지 여부를 지정하는 메서드
  // 반드시 true 또는 false를 반환해야 한다.
  // 컴포넌트 만들 때 이 메서드를 따로 생성하지 않으면 기본적으로 언제나 true를 반환한다.
  // 이 메서드 안에서 현재 props와 state는 this.props와 this.state로 접근
  // 새로 설정될 props와 state는 nextProps와 nextState로 접근할 수 있다.
  // false 반환하는 타이밍을 잘 활용하면 컴포넌트의 성능을 최적화해서 개선하는데 도움이 된다.
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shoulComponentUpdate', nextProps, nextState);
    // 일의 자리가 4인 경우 re-rendering 되지 않기 때문에 브라우저 상에 일의 자리가 4인 숫자는 보이지 않는다.
    return nextState.number % 10 !== 4;
  }


  // 컴포넌트를 DOM에서 제거할 때 실행
  // componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거를 해야 한다.
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    })
  }


  // render() 함수에서 만들어진 결과물이 브라우저에 실제 반영되기 직전에 호출
  // 여기에서 반환한 값은 componentDidUpdate 메서드에서 세 번째 인자인 snapshot으로 받아서 사용할 수 있다.
  // 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용한다.(ex. 스크롤바 위치 유지, 라이트 모드/다크 모드 설정 값 유지)
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }


  // re-rendering 완료 후 실행된다.
  // 업데이트가 끝난 직후이므로 DOM 관련 처리를 해도 무방하다.
  // prevProps나 prevState를 사용해서 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있다.
  // getSnapshotBeforeUpdate에서 반환한 값을 snapshot으로 받아서 사용할 수도 있다.
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState);
    if (snapshot) {
      console.log(`업데이트되기 직전 color: ${snapshot}`);
    }
  }


  // 브라우저 상에 어떻게 보일지 구성
  render() {
    console.log('render');
    const style = {
      color: this.state.color
    };

    return (
      <div>
        {/* componentDidCatch 메서드 확인시 아래 구문 주석 해제 */}
        {/* {this.props.missing.value} */}
        <h1 style={style} ref={ref => this.myRef = ref}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>
          더하기
        </button>
      </div>
    );
  }
}

export default LifeCycleSample;