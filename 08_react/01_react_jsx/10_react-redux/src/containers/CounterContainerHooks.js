import React, { useCallback } from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
  // useSelector hook: connect 함수를 사용하지 않고도 리덕스 상태를 조회할 수 있다.
  // const 결과 = useSelector(상태 선택 함수);
  // 상태 선택 함수는 mapStateToProps와 형태가 똑같다.
  const number = useSelector(state => state.counter.number);

  // useDispatch hook: 컴포넌트 내부에서 스토어의 내장 함수 dispatch(=== 액션을 발생시키는 것)를 사용할 수 있게 해준다.
  // 컨테이너 컴포넌트에서 액션을 dispatch 해야한다면 이 hook을 사용한다.
  // const dispatch = useDispatch();
  // dispatch({ type: 'SAMPLE_ACTION' });
  const dispatch = useDispatch();

  // useDispatch만 사용할 때는 re-rendering 될 때마다 onIncrease, onDecrease 함수가 새롭게 만들어지고 있다.
  // 만약 컴포넌트 성능을 최적화해야 하는 상황이 온다면 useCallback으로 액션을 dispatch 하는 함수를 감싸 주는 것이 좋다.
  // useDispatch와 useCallback을 함께 쓰는 습관을 길들이자!
  const onIncrease = useCallback(() => dispatch(increase()) , [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()) , [dispatch]);

  return (
    <Counter
      number={number}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
    />
  );
};

export default CounterContainer;