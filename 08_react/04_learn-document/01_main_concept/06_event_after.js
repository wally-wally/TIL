class Toggle extends React.Component {
  // after(최근 방식)
  // babel의 transform-class-properties 문법을 이용하여 화살표 함수를 사용하면 this binding을 별도로 처리할 필요없이 간단하게 작성 가능하다.
  // 참고 문서 : https://1995-dev.tistory.com/71
  state = {
    isToggleOn: true,
    message: '',
  };

  // public class field 문법(보통 이 방법을 많이 사용한다고 한다.)
  handleClick = () => {
    this.setState(prevState => {
      return {
        isToggleOn: !prevState.isToggleOn
      }
    });
  }

  // 이벤트 핸들러에 인자 전달하기

  // (1) 일반적인 방법
  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    })
  }

  // (2) render 메소드 단에서 이벤트 핸들러에 직접 인자 전달해서 받는 경우
  // 이 때 input의 onChange 이벤트 핸들러 인자로 넘기는 부분에서는
  // onChange={e => this.handleChange(e.target.value)}와 같이 작성해야 한다.
  // handleChange(value) {
  //   this.setState({
  //     message: value,
  //   })
  // }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);