import React, { Component } from 'react';

// 클래스형 컴포넌트에서의 React Lifecycle
// constructor => render => (ref가 있는 경우 ref rendering) => componentDidMount
// (setState나 props가 바뀔 때) => shouldComponentUpdate(true인 경우 후속 과정 진행) => render(리렌더링) => ComponentDidUpdate
// (부모 컴포넌트가 나를 없앴을 때) => componentWillUnmount => 소멸

const rspCoords = {
  '바위': '0',
  '가위': '-142px',
  '보': '-284px',
}

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const computerChoice = (imgCoord) => { // 컴퓨터가 어떤 손 내고 있는지 판단하는 함수
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  };

  interval;

  // 컴포넌트가 첫 rendering된 후 (re-rendering 될 때는 동작하지 않는다.)
  // 주로 여기에 비동기 요청을 많이 한다.
  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100);
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return true;
  // }

  // 컴포넌트가 re-rendering 될 때만 실행
  // componentDidUpdate() {

  // }

  // 컴포넌트가 제거되기 직전
  // 비동기 요청 정리를 여기에서 많이 한다.
  // 이 라이프 사이클을 사용하지 않고 자식 컴포넌트를 없애면 메모리 누수 문제가 일어날 수 있다.
  // ex) componentDidMount에서 만든 setInterval을 여기에서 clearInterval로 없애줘야 한다.
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // render 부분에서 onClick={() => this.onClickBtn('바위')}와 같이 메서드 안에 함수를 호출하는 부분을 리팩토링 한다면
  // () => 을 없애고 아래 onClickBtn 함수 부분에서 () => 를 아래 코드의 위치에 작성하면 된다.(작성 위치 주의!)
  // 이러한 함수 패턴을 High Order Function 이라고 한다. 리액트에서 이러한 패턴은 자주 사용되니 알아두자!
  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다!',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => { // 예전 점수에서 1을 더하므로 함수형태로 작성
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => { // 예전 점수에서 1을 빼므로 함수형태로 작성
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  }

  changeHand = () => {
    const { imgCoord } = this.state; // 이 구문도 setInterval의 콜백 함수 안에 넣어야 사진이 1초 마다 바뀐다.
    // 비동기 함수가 바깥에 있는 변수를 참조하면 클로저가 발생하기 때문에 주의해야 한다.
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;