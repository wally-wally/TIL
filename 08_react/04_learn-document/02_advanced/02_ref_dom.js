class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    // ref 어트리뷰트가 커스텀 클래스 컴포넌트에 쓰였다면, ref 객체는 마운트된 컴포넌트의 인스턴스를 current 프로퍼티의 값으로서 받습니다.
    console.log(this.textInput);
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성합니다.
    this.textInput = React.createRef();
    // ref 어트리뷰트가 HTML 엘리먼트에 쓰였다면, 생성자에서 React.createRef()로 생성된 ref는 자신을 전달받은 DOM 엘리먼트를 current 프로퍼티의 값으로서 받습니다.
    console.log(this.textInput);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스합니다.
    // 주의: 우리는 지금 DOM 노드를 얻기 위해 "current" 프로퍼티에 접근하고 있습니다.
    this.textInput.current.focus();
  }

  render() {
    // React에게 우리가 text 타입의 input 엘리먼트를
    // 우리가 생성자에서 생성한 `textInput` ref와 연결하고 싶다고 이야기합니다.
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <AutoFocusTextInput />,
  document.getElementById('root')
);


// ref 속성을 사용하기 위해서는 컴포넌트의 인스턴스가 마운트된 후에 접근해서 사용하면 된다.