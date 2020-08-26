import React, { useState, useRef, useEffect, memo } from 'react';

const rspCoords = {
  '바위': '0',
  '가위': '-142px',
  '보': '-284px',
}

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const computerChoice = (imgCoord) => { // 컴퓨터가 어떤 손 내고 있는지 판단하는 함수
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  // useEffect
  // componentDidMount, componentDidUpdate의 역할 (1대1 대응은 아님)
  // 두 번째 인자로 넣은 값들이 바뀔 때마다 useEffect가 실행된다. => componentDidUpdate
  // 만약 빈 배열로 설정하면 처음에 딱 한 번만 실행된다. => componentDidMount
  useEffect(() => {
    interval.current = setInterval(changeHand, 100);
    return () => { // 이 부분이 componentWillUnmount 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]);
  // 두 번째 인자로 class형 컴포넌트에서 발생한 클로저 문제를 해결할 수 있다.
  // useEffect를 실행하고 싶은 state를 넣어주면 된다.

  // useEffect는 여러 번 사용해도 가능하다.(state에 따라 다르게 처리하고 싶을 때)
  // class형 컴포넌트에서는 componentDidMount나 componentDidUpdate에서 모든 state를 조건문으로 분기 처리한다.

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  }

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다!');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
}

export default memo(RSP);