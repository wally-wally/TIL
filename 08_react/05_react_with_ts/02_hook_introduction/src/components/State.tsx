import React, { useState } from 'react';

const State = () => {
  // useState
  // 현재의 state 값과 이 값을 업데이트하는 함수를 쌓으로 제공한다.
  // 이 state는 컴포넌트가 re-rendering 되어도 그대로 유지한다.
  // class의 this.setState와의 차이점은 이전 state와 새로운 state를 합치지 않는다.
  // this.state와 달리 useStat의 state는 객체일 필요가 없다.
  // useState의 초기값은 첫 번째 rendering에서 딱 한번만 사용된다.
  const [count, setCount] = useState(0);

  // 하나의 컴포넌트 내에서 useState를 여러 개 사용할 수 있다.
  const [name, setName] = useState('wally');
  const [todos, setTodos] = useState([
    {
      id: 1,
      todo: 'Cleaning'
    },
  ]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <hr />
      <div>{name}</div>
      <div>{todos[0].todo}</div>
    </div>
  );
}

export default State;