// JSX는 React.createElement(component, props, ...children) 함수에 대한 문법적 설탕이다.

// before compile
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

// after compile
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)

// 1. React Element의 타입 지정하기 => [한 줄 요약!]항상 대문자로 시작하자!
// - React가 스코프 내에 존재해야 합니다
// - JSX 타입을 위한 점 표기법 사용
// - 사용자 정의 컴포넌트는 반드시 대문자로 시작해야합니다.
// - 만약 element 타입을 지정할 때 일반적인 표현식을 사용하고자 한다면 대문자로 시작하는 변수에 배정한 후 사용할 수 있습니다.

// 2. JSX 안에서의 prop 사용
// - javascript 표현식(expression)을 {} 안에 넣어서 JSX 안에서 prop으로 사용할 수 있다.
// - 하지만 if문, for문, while문, switch문, variable declaration 등은 문장(statements)이므로 JSX 안에서 그대로 사용할 수 없지만
// -아래 예시와 같이 JSX 밖의 주변 코드에서 사용할 수 있다.
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
// -문자열 리터럴 prop으로 넘기기
{/* <MyComponent message="hello world" /> */}
{/* <MyComponent message={'hello world'} /> */}
// - 아래 두 식도 동일한 표현(HTML 이스케이프 처리가 되지 않음)
{/* <MyComponent message="&lt;3" /> */}
{/* <MyComponent message={'<3'} /> */}
// - prop에 어떤 값도 넘기지 않을 경우 기본값은 true이다.
// - spread operator오 props를 넘겨줄 수 있다.(App1, App2는 동일한 표현)
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}

// 3. JSX에서 자식 다루기
// - 컴포넌트 여는 태그와 닫는 태그 사이에 작성한 내용은 자식 컴포넌트에서 props.children으로 접근할 수 있다.
// - HTML은 이스케이프 처리가 되지 않으므로 일반적으로 HTML을 쓰는 방식으로 JSX를 쓸 수 있다.
{/* <MyComponent>Hello, &lt;wow&gt;</MyComponent> */}
{/* <MyComponent>Hello &amp; Bye</MyComponent> */}
// - javascript 표현식도 {}에 감싸서 자식으로 넘길 수 있다.
// - 물론 함수를 자식으로 사용할 수도 있다.
// ex) 자식 콜백인 numTimes를 호출하여 반복되는 컴포넌트를 생성합니다.
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
// - false, null, undefined와 true는 유효한 자식입니다. 그저 렌더링 되지 않을 뿐입니다. 아래의 JSX 표현식들은 동일하게 렌더링됩니다. 이는 React element들을 조건부 렌더링할 때 유용합니다.
// - 주의해야 할 점은 0과 같은 falsy한 값들은 React가 렌더링 하므로 && 연산자 사용시 앞의 표현식이 언제나 진리값이 되도록 해야 한다.