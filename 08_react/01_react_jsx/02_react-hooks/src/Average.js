import React, { useState, useMemo, useCallback, useRef } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산');
  if (!numbers.length) {
    return 0;
  }
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');
  // useRef hook
  // 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해주는 hook이다.
  const inputEl = useRef(null);

  // useCallback hook
  // useCallback을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있다.
  // 첫 번째 인자는 생성하고 싶은 함수를 넣고, 두 번째 인자는 배열을 넣는다.
  // 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 한다.
  // 빈 배열을 넣으면 컴포넌트가 처음 rendering 될 때만 함수 생성된다.
  // 즉, 함수 내부에서 상태 값에 의존해야 할 때 그 값을 반드시 두 번째 인자로 배열 원소에 포함시켜 줘야 한다.
  // 참고로 useCallback은 useMemo로도 구현이 가능하다.
  // 그래서 숫자, 문자열, 객체처럼 일반 값을 재사용하려면 useMemo를,
  // 함수를 재사용하려면 useCallback을 사용하는 것이 좋다.
  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []);

  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
    inputEl.current.focus(); // '등록' 버튼 누른 후 포커스가 input 쪽으로 넘어가도록 구성
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성

  // 아래와 같이 작성하면 컴포넌트가 re-rendering 될 때마다 이 함수들이 새로 생성된다.
  // 대부분의 경우 이러한 방식은 문제가 없지만, 컴포넌트의 rendering이 자주 발생하거나 rendering 해야 할 컴포넌트의 개수가 많아지면
  // 해당 부분을 최적화해 주는 것이 좋다.
  // const onChange = e => {
  //   setNumber(e.target.value);
  // };

  // const onInsert = e => {
  //   const nextList = list.concat(parseInt(number));
  //   setList(nextList);
  //   setNumber('');
  // };

  // useMemo hook
  // useMemo를 사용하지 않는 경우 input 내용이 수정될 때마다 getAverage 함수가 호출된다.
  // input 내용이 바뀔 때는 평균값을 다시 계산하는 로직히 필요가 없기 때문에 이러한 불필요한 렌더링을 막기 위해 useMemo를 사용한다.
  // rendering 하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식이다.
  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        {/* not using useMemo */}
        {/* <b>평균값:</b> {getAverage(list)} */}

        {/* using useMemo */}
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;