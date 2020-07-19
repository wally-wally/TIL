import React, { useReducer } from 'react';

// 리듀서: 현재 상태, 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수
// 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜 줘야 한다.
// cf) redux의 리듀서에서 액션 객체에 어떤 액션인지 알려주는 type 필드가 반드시 있어야 함
// 하지만 useReducer에서 사용하는 액션 객체는 반드시 type을 지니고 있을 필요가 없고 심지어 객체가 아니라 문자열이나 숫자여도 상관없다.
function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 }
    case 'DECREMENT':
      return { value: state.value - 1 }
    default: // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const Counter = () => {
  // useState hook
  // useState 함수의 파라미터에 상태의 기본값을 설정한다
  // 이 때 반환되는 값은 배열 형태인데 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 결정하는 함수이다.
  // 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터를 값이 바뀌고 컴포넌트가 정상적으로 re-rendering 된다.
  // const [value, setValue] = useState(0);

  // useReducer hook
  // 첫 번째 인자는 리듀서 함수를, 두 번째 인자는 해당 리듀서의 기본값을 넣어준다.
  // 이 때 반환되는 값은 배열안에 state와 dispatch를 주는데 state는 현재 가리키고 있는 상태를, dispatch는 액션을 발생시키는 함수이다.
  // dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣으면 리듀서 함수가 호출된다.
  // 컴포넌트의 update 로직을 컴포넌트 바깥으로 빼서 작성하기 때문에 코드 관리에 용이하다는 장점이 있다.
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      {/* useState */}
      {/* <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button> */}
      
      {/* useReducer */}
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};

export default Counter;