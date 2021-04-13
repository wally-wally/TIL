// React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용 하는 것이 좋다.
function FancyBorder(props) {
  console.log(props);
  // <FancyBorder> JSX 태그 안에 있는 것들이 FancyBorder 컴포넌트의 children prop으로 전달된다.
  // FancyBorder는 {props.children}을 <div> 안에 렌더링하므로 전달된 엘리먼트들이 최종 출력된다.
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  console.log(props);
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

// function WelcomeDialog() {
//   return (
//     <FancyBorder color="blue">
//       <h1 className="Dialog-title">
//         Welcome
//       </h1>
//       <p className="Dialog-message">
//         Thank you for visiting our spacecraft!
//       </p>
//     </FancyBorder>
//   );
// }

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('root')
);
  

// 상속(Inheritance): is-a
// - 다른 부모클래스를 만든 후 자식클래스는 이 부모클래스를 상속받아서 구현을 정의

// 합성(Composition): has-a
// - 서로 다른 객체를 여러 개 붙여서 새로운 기능이나 객체를 구성
// - 일반적으로 합성 할 클래스를 변수에 할당 후 사용하는 구조
// - 이렇게 합성한 경우 상속과는 다르게 클래스간의 유기적으로 서로의 클래스를 융통성있게 합성할 수 있음

// 결론
// - 상속은 재사용의 관점보다는 기능 확장에 사용합니다.
// - 재사용을 하기 위해서는 합성(Composition) has-a 방식을 사용합시다.