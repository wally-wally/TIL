import React, { PureComponent } from 'react';

class RenderTest extends PureComponent {
  state = {
    counter: 0,
    string: 'hello',
    number: 1,
    boolean: true,
    object: {},
    array: []
  };

  // shouldComponentUpdate로 언제 rendering이 되어야 하는지 명시할 수 있다.
  // shouldComponentUpdate는 PureComponent를 커스텀하게 설정하고 싶을 때 사용한다.
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   if (this.state.counter !== nextState.counter) {
  //     return true;
  //   }
  //   return false;
  // }

  // 만약 shouldComponentUpdate가 어렵다면 Component 대신에 PureComponent를 작성하면 된다.
  // PureComponent가 shouldComponentUpdate가 하는 일을 자동으로 대신해준다.(state를 보고 바뀌었는지 안 바뀌었는지 판단해서 바뀌는 경우에만 rendering 됨)
  // 하지만 object나 array 처럼 참조 관계를 가지는 것들은 감지하기 어려워한다. (새로운 배열이나 객체를 만들어주지 않으면 감지하기 어려움)

  // 함수형 컴포넌트에서는 React.memo를 사용한다.

  onClick = () => {
    // 아래와 같이 새로운 배열이나 새로운 객체를 만들어주자!
    this.setState({
      array: [...this.state.array, 1],
    });
  }

  render() {
    console.log('렌더링', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    )
  }
}

export default RenderTest;