import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    message: ''
  }

  // constructor(props) {
  //   super(props);
  //   // 함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서
  //   // 메서드와 this의 관계가 끊어져 버림
  //   // 이 때문에 임의 메서드가 이벤트로 등록되어도 this를 컴포넌트 자신으로 제대로 가리키기 위해
  //   // 메서드를 this와 바인딩하는 작업이 필요함
  //   // 만약 바인딩하지 않은 경우라면 this가 undefined를 가리킴
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  // }

  // handleChange(e) {
  //   this.setState({
  //     message: e.target.value
  //   });
  // }

  // handleClick() {
  //   alert(this.state.message);
  //   this.setState({
  //     message: ''
  //   });
  // }

  // 하지만 바벨의 transform-class-properties 문법을 이용하여 화살표 함수를 사용하면 constructor 사용할 필요 없이 간단하게 작성 가능하다.
  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  handleClick = () => {
    alert(this.state.message);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;