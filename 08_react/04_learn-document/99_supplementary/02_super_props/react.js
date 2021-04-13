class Toggle extends React.Component {
  constructor(props) {
    // react에서 신기한 점은 super() 사용시 props 인자를 넘기지 않아도 동작은 한다.
    // 왜냐하면 React 내에 Component 로직에서 this.props = props; 구문으로 props를 매칭해주고 있다.

    // (https://github.com/facebook/react/blob/1d25aa5787d4e19704c049c3cfa985d3b5190e0d/packages/react/src/ReactBaseClasses.js#L22)
    // function Component(props, context, updater) {
    //   this.props = props;
    //   this.context = context;
    //   생략
    // }

    // 그래서 만약에 super() 안에 props 추가하는 것을 까먹어도 리액트는 여전히 올바르게 동작한다.
    // 그러면 앞으로는 super(props); 대신에 super();로 써도 되는지라고 물어보면 가급적 super(props);로 쓰라는 것을 권장한다.

    // 리액트는 constructor 실행 후 this.props를 할당한다. 하지만 super();가 불러진 이후 this.props를 console.log()로 확인해보면 undefined라는 것을 볼 수 있다.
    // 즉, 서비스를 개발할 때 디버깅시 혼란만 가중시킬 수 있기 때문에 명확하게 super(props); 작성하는 권장한다.
    // (constructor cycle이 끝나기 전 this.props가 생성되는 것을 보장해줌)
    
    super(props);
    console.log(props);
    console.log(this.props); // super(); 로 작성하면 undefined가 출력됨
    // 즉, constructor 안에서 props를 접근하고 싶을 때 super(props);를 하면 된다.
    this.state = {isToggleOn: true};
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={() => this.handleClick()}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);