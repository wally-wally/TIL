import React, { Component } from 'react';

class Counter extends Component {
  // props vs state
  // props : 읽기 전용
  // state : 변화시키기도 가능함
  state = {
    number: 0
  };

  // 화살표 함수로 작성하지 않고 handleIncrease() {} 와 같이 작성하는 경우
  // constructor와 super를 이용해 아래와 같이 선언해야 this에서 우리가 원하는 함수로 접근이 가능하다.
  // constructor(props) {
  //   super(props);
  //   this.handleIncrease = this.handleIncrease.bind(this);
  //   this.handleDecrease = this.handleDecrease.bind(this);
  // }

  // 여기서는 화살표 함수로 작성해야 this에 접근하여 setState를 불러올 수 있다.
  handleIncrease = () => {
    // this.state.number = this.state.number + 1 이렇게는 절대 작성 금지
    // 위와 같이 작성하면 컴포넌트에서 state 값이 업데이트가 됐는지 안 됐는지 알 수가 없다
    // 그래서 re-rendering을 하지 않아 원하는 결과가 나타나지 않을 수 있다.
    // 반드시 setState() 함수를 사용하자!
    this.setState({
      number: this.state.number + 1
    });
  };

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  };

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
