import React, { PureComponent } from 'react';

class Try extends PureComponent {
  // 클래스형 컴포넌트방식의 자식 컴포넌트에서 props 데이터 바꿔야 할 때
  // constructor(props) {
  //   super(props);
  //   // 다른 동작 수행 가능
  //   const filtered = this.props.filter(() => {});
  //   this.state = {
  //     result: filtered,
  //     try: this.props.try,
  //   }
  // }
  

  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
  }
}

export default Try;