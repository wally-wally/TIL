import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers'); // 해당 함수가 필요할 때만 실행되는지 확인하기 위해 console.log를 꼭 넣고 확인하자!
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  // useMemo
  // 두 번째 요소에 값이 있는 경우 그 값이 바뀌지 않는 이상 재실행 되지 않는다.
  // 즉, 빈 배열이면 처음에 한 번만 실행되고 그 값들을 기억한다.
  // (useMemo: 복잡한 함수 결괏값(return 값)을 기억 vs useRef: 일반 값을 기억 vs useCallback: 함수 자체를 기억)
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // 두 번째 인자의 값이 바뀌기 전까지 해당 값을 기억
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);
  // hooks Tip!
  // 조건문 안에 useState, useRef와 같은 hooks를 절대로 넣지 말자
  // 함수나 반복문 안에도 웬만하면 넣지 말자
  // useCallback, useEffect 안에서도 useState 같은 것들을 웬만하면 쓰지 말자
  // 그래서 hooks는 최상위에 순서를 지켜서 작성하도록 하자

  // [Tip]componentDidMount에서만 동작을 실행하고 싶을 때 => 패턴처럼 외우자
  useEffect(() => {
    // 여기에 수행할 동작 작성
  }, []);

  // [Tip]componentDidUpdate에서만 동작을 실행하고 싶을 때 => 패턴처럼 외우자
  // (componentDidMount에서는 실행 X)
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // 여기에 수행할 동작 작성
    }
  }, [바뀌는값]);

  // useEffect는 두 번째 인자의 값이 바뀔 때 실행한다.
  // 참고로 useEffect는 여러 번 사용할 수 있다. 그래서 각 값마다 바뀔 때 실행되는 동작들을 다르게 설정할 수 있다.
  // 그래서 클래스형에서는 componentDidUpdate 안에 조건문으로 분기해서 한 번에 작성할 수 있지만
  // 함수형에서는 useEffect를 여러번 사용해서 나눠서 작성해야 한다.
  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      // 참고로 여기에 있는 timeouts.current[i]에 값을 넣는 것은
      // timeouts의 배열에 요소에 값을 넣는 것이기 때문에
      // timeouts가 바뀌는 것이 아니다.
      // 그래서 이 구문에 의해 useEffect가 동작하지 않는다.
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => { // componentWillUnmount
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 두 번째 인자가 빈 배열이면 componentDidMount와 동일
  // 만약 두 번째 인자에 요소가 있으면 componentDidMount와 componentDidUpdate도 수행
  // [timeouts.current] : timeouts.current 값이 바뀌는 경우에만 useEffect 동작

  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);

  // useCallback
  // 함수형 컴포넌트를 함수 전체가 재실행되기 때문에 useMemo에서 값을 기억하는 것처럼
  // useCallback을 사용하면 함수 자체를 기억할 수 있다.
  // 함수 생성 비용이 너무 큰 경우 useCallback으로 해당 함수를 기억해서 다시 만드는 작업을 수행하지 않아도 된다.
  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    // 하지만 useCallback이 무조건 100% 좋은 것은 아니다.
    // useCallback이 기억을 너무 잘하기 때문에 아래와 같이 winNumbers의 값들을 확인하면
    // 새로운 당첨 숫자들이 아닌 맨 처음에 뽑은 숫자들만 계속 찍히는 것을 확인할 수 있다.
    // 그래서 이러한 문제를 해결하려면 useCallback의 두 번째 인자의 배열에 값을 넣어주면 된다.
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = []; // 이 구문에서는 timeouts의 current 값이 직접 바뀌는 것이기 때문에 이 시점에서 useEffect가 동작한다.
  }, [winNumbers]); // 두 번째 인자의 배열에 값이 있는 경우 그 값들이 바뀔 때만 해당 함수가 재실행된다.
  // [중요!]그래서 useMemo와 useCallback의 두 번째 인자의 배열에 넣는 값들을 설정함으로써
  // 어느 경우에 해당 함수를 재실행할지 결정할 수 있다.
  // [중요!]반드시 useCallback을 사용해야 할 때
  // 자식 컴포넌트에 props로 함수를 전달해야할 때는 반드시 useCallback을 사용해야 한다.
  // 함수 자체는 실제로 바뀐게 없는데 자식 컴포넌트는 바뀌었다고 인식할 수 있다.
  // 그래서 부모로부터 받은 함수가 같다는 것을 알려주기 위해 useCallback을 써야 한다.

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
}

export default Lotto;