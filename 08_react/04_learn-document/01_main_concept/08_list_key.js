// Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다.
// key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야한다.
// 가장 좋은 Key는 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것이 좋다.(대부분 각 항목의 고유 ID를 사용)
// 만약 Key 값으로 사용할만한 데이터가 없다면 항목의 인덱스를 사용할 수 있으나 항목의 순서가 바뀔 수 있는 경우에는 인덱스 사용하는 것은 권장하지 않는다.
// (성능 저하 또는 컴포넌트의 state 관련 문제가 발생할 수도 있음)

function ListItem({ value }) {
  // 여기에는 key를 지정할 필요가 없다.
  return <li>{value}</li>;
}

function SquareNums(props) {
  const numbers = props.numbers;
  // 배열 안에 key를 지정해야 한다.
  // 별도의 ListItem 컴포넌트를 추출하면 그 안에 있는 <li> 엘리먼ㅌ가 아닌
  // 배열의 <ListItem /> 엘리먼트가 key를 가져야 한다.
  // (주로 map() 함수 내부에 있는 엘리먼트에 key를 넣어 주는게 좋다.)
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()} value={number ** 2} />
      )}
    </ul>
  );

  // 참고로 위와 같이 JSX에 map()을 포함시킬지 아니면 별도의 변수로 분리하여 작성할 것인지는 개발자가 직접 판단해야 한다.
  // 하지만 위와 같은 방식을 너무 많이 남발해도 꼭 좋은 것은 아니므로 적절하게 사용하도록 하자.
  // map() 함수가 너무 중첩된다면 컴포넌트로 추출하는 것이 좋다.
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
ReactDOM.render(
  <SquareNums numbers={numbers} />,
  document.getElementById('root')
);