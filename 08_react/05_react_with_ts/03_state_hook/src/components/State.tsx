import React, { useState } from 'react';

const State = () => {
  // useState는 클래스 컴포넌트의 this.state가 제공하는 기능과 똑같다.
  // 함수 컴포넌트의 state는 클래스와 달리 객체일 필요는 없고, 숫자 타입과 문자 타입을 가질 수 있다.
  // 만일 2개의 다른 변수를 저장하기 원한다면 useState()를 두 번 호출해야 한다.
  const [count, setCount] = useState(0);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  // 여러 개의 state 변수를 사용하지 않아도 된다.
  // state 변수는 객체와 배열을 잘 가지고 있을 수 있으므로 서로 연관있는 데이터를 묶을 수 있다.
  // 하지만 클래스 컴포넌트의 this.setState와 달리 state를 갱신하는 것은 병합하는 것이 아니라 대체하는 것이다.

  return (
    <div>
      {/*
        클래스 컴포넌트에서는 this.state.count로 접근했으나
        함수 컴포넌트에서는 count로 직접 접근이 가능하다.
      */}
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default State;