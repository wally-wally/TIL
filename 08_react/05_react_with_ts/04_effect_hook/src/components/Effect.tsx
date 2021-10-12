import React, { useState, useEffect } from 'react';

const Effect = () => {
  const [count, setCount] = useState(0);

  // useEffect는 컴포넌트가 렌더링 이후에 어떤 일을 수행한다.
  // useEffect를 컴포넌트 내부에 둠으로써 state 변수 또는 props에 접근할 수 있다.
  // useEffect는 기본적으로 첫 번째 렌더링과 이후의 모든 업데이트에서 수행된다.(React는 effect가 수행되는 시점에 이미 DOM이 업데이트되었음을 보장한다.)
  // 모든 업데이트 과정에서 수행되므로 최적화 작업을 꼭 처리해야 한다.
  // 클래스 컴포넌트에서 실수할 수 있는 업데이트 로직 빼먹는 것을 방지할 수 있다.
  // 두 번째 인자로 아래와 같이 작성하면 count 값이 바뀔 때만 아래 로직이 수행한다.(성능 최적화)
  useEffect(() => {
    document.querySelector('.message')!.innerHTML = `You clicked ${count} times`;
  }, [count]);
  
  // 만일 컴포넌트 첫 마운트할 때만 실행하고 싶다면 두 번째 인자로 빈 배열을 넘기면 된다.
  // 이렇게 함으로써 React로 하여금 여러분의 effect가 prop이나 state의 그 어떤 값에도 의존하지 않으며 따라서 재실행되어야 할 필요가 없음을 알게 하는 것이다.
  // 빈 배열([])을 넘기게 되면, effect 안의 prop과 state는 초깃값을 유지하게 된다.

  return (
    <div>
      <p className="message">You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default Effect;