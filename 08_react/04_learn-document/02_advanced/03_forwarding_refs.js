// 직접적인 부모-자식간이 아닌, ref 를 자식에게 전달해 자식의 요소를 부모가 참조하는 방법
// 두 번째 ref 인자는 React.forwardRef와 같이 호출된 컴포넌트를 정의했을 때에만 생성됩니다.
// 일반 함수나 클래스 컴포넌트는 ref 인자를 받지도 않고 props에서 사용할 수도 없습니다.
// Ref 전달은 DOM 컴포넌트에만 한정적이지 않습니다. 클래스 컴포넌트 인스턴스에도 전달할 수 있습니다.
// React가 해당 ref를 붙이고 난 뒤, ref.current는 <button> DOM 엘리먼트 인스턴스를 직접 가리키게 됩니다.
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children} - {props.id}
  </button>
));

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();
  }
  
  render() {
    console.log(this.ref1);
    console.log(this.ref2);
    return (
      <div>
        <FancyButton ref={this.ref1} id={1}>Click me!</FancyButton>
        <FancyButton ref={this.ref2} id={2}>Click me!</FancyButton>
      </div>
    );
  }
}

ReactDOM.render(
  <Button />,
  document.getElementById('root')
);