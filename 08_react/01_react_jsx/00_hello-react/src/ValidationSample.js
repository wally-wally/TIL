import React, { Component } from 'react';
import './ValidationSample.css';

class ValidationSample extends Component {
  state = {
    password: '',
    clicked: false,
    validated: false
  }

  handleChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000'
    })
    this.input.focus();
  }

  // Q. 주로 state를 사용해서 필요한 기능을 구현했지만 state만으로 해결 할 수 없는 기능이 있는데 이를 ref를 통해서 해결할 수 있다.
  //    그렇다면 ref는 주로 언제 사용할까?
  // A. '어쩔 수 없이 DOM을 꼭 직접적으로 건드려야 할 때' 사용한다.
  //    - 특정 input에 focus 주기
  //    - 스크롤 박스 조작하기
  //    - Canvas 요소에 그림 그리기 등
  // 이번 예제에서는 콜백 함수를 이용해서 ref 설정하는 방법을 살펴보자.

  render() {
    return (
      <div>
        <input
          ref={ref => this.input = ref}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;