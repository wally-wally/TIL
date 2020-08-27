import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  };
  
  timeouts = [];

  runTimeouts = () => {
    console.log('runTimeouts');
    const { winNumbers } = this.state;
    // for문에 let을 썼기 때문에 setTimeout과 같은 비동기 함수에서 클로저 문제가 발생하지 않는다.(ES6 이후 생김)
    for (let i = 0; i < winNumbers.length - 1; i++) { // 보너스 공은 빼야하므로 -1을 작성함
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]]
          };
        });
      }, (i + 1) * 1000);
    }
    // 보너스공 보여주기
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    console.log('didMount');
    this.runTimeouts();
  }

  // componentDidUpdate에서는 조건문에 중요하다!
  // this.setState 할 때마다 componentDidUpdate는 항상 실행되지만 조건문을 만족할 때만 동작(update)하도록 설정할 수 있다.
  // prevProps, prevState를 활용할 수 있다.
  componentDidUpdate(prevProps, prevState) {
    console.log('didUpdate');
    if (this.timeouts.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log('로또 숫자를 생성합니다.');
    }
  }

  // Will 시리즈는 componentWillUnmount만 기억하자(나머지 라이프사이클은 없어질 예정)
  // 메모리 누수 문제를 막기 위해 clearTimeout을 잊지말자!
  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    console.log('onClickRedo');
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  }

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;