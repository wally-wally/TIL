import React, { useState, useEffect } from 'react';

const Effect = ()  => {
  const [count, setCount] = useState(0);

  // useEffect
  // 함수 컴포넌트 내에서 side effects(ex. 데이터 가져오거나 구독, DOM 조작 등)를 수행할 수 있다.
  // class 기반의 컴포넌트에서 lifecycle hook인 componentDidMount, componentDidUpdate, componentWillUnmount와 같은 목적으로 제공되지만,
  // 하나의 API로 통합된 것이다.
  useEffect(() => {
    // 브라우저 API를 이용해 문서의 타이틀을 업데이트
    document.title = `You clicked ${count} times`;
  });

  // useEffect 내에서 props와 state에 접근할 수 있다.
  // 기본적으로 react는 매 렌더링 이후에 useEffect를 실행한다.

  // 만약 effect를 해제해야 한다면 해제하는 함수를 return 해주면 된다.(optional)
  // useState와 마찬가지로 한 컴포넌트 내에서 여러 개 작성할 수 있다.
  // useEffect(() => {
  //   ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  //   return () => {
  //     ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  //   };
  // });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Effect;