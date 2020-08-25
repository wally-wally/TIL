import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  // hooks에서는 this의 속성을 useRef를 사용해서 선언한다.
  // 단 ref를 이용해서 값을 가져와서 사용하거나 할당할 때는 뒤에 .current 를 꼭 붙여줘야 한다.
  const timeout = useRef(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  // state vs ref
  // state가 바뀌면 return 부분이 다시 실행되지만
  // ref가 바뀌면 return 부분이 다시 실행되지 않는다.
  // 이러한 특징들을 이용해서 불필요한 렌더링을 막는 것이 중요하다.

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current]
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <>
          <div>평균 시간: {(result.reduce((a, c) => a + c) / result.length).toFixed(3)}ms</div>
          <button onClick={onReset}>Reset</button>
        </>
  }

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
}

export default ResponseCheck;