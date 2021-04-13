class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    
    // ref 어트리뷰트에 React.createRef()를 통해 생성된 ref를 전달하는 대신, 함수를 전달
    // 전달된 함수는 다른 곳에 저장되고 접근될 수 있는 React 컴포넌트의 인스턴스나 DOM 엘리먼트를 인자(아래 구문에서 element 인자)로서 받는다.
    this.setTextInputRef = element => {
      this.textInput = element;
    };
    console.log(this.textInput);

    this.focusTextInput = () => {
      // DOM API를 사용하여 text 타입의 input 엘리먼트를 포커스합니다.
      if (this.textInput) this.textInput.focus();
    };
  }

  // 컴포넌트의 인스턴스가 마운트 될 때 React는 ref 콜백을 DOM 엘리먼트와 함께 호출합니다.
  // 그리고 컴포넌트의 인스턴스의 마운트가 해제될 때, ref 콜백을 null과 함께 호출합니다.
  // ref 콜백들은 componentDidMount 또는 componentDidUpdate가 호출되기 전에 호출됩니다.
  componentDidMount() {
    // 마운트 되었을 때 자동으로 text 타입의 input 엘리먼트를 포커스합니다.
    console.log(this.textInput);
    this.focusTextInput();
  }

  render() {
    // text 타입의 input 엘리먼트의 참조를 인스턴스의 프로퍼티
    // (예를 들어`this.textInput`)에 저장하기 위해 `ref` 콜백을 사용합니다.
    return (
      <div>
        {/* 혹은 ref={el => this.textInput = el} 으로도 작성 가능 */}
        <input
          type="text"
          ref={this.setTextInputRef}
        />
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
  <CustomTextInput />,
  document.getElementById('root')
);