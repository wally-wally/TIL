// 컴포넌트 렌더링 과정
// (1) <Welcome name="Sara" />, <Welcome name="Wally" /> 엘리먼트들로 ReactDOM.render()를 호출
// (2) React는 {name: 'Sara'}, {name: 'Wally'}를 props로 하여 Welcome 컴포넌트를 호출
// (3) Welcome 컴포넌트를 결과적으로 <h1>Hello, Sara</h1>과 <h1>Hello, Wally</h1> 엘리먼트를 각각 반환
// (4) React DOM은 <h1>Hello, Sara</h1>, <h1>Hello, Wally</h1> 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트

// 함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 됩니다. 
// 모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 합니다.
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = (
  <React.Fragment>
    <Welcome name="Sara" />
    <Welcome name="Wally" />
  </React.Fragment>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);