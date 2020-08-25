import React, { Component, createRef } from 'react';
import Try from './Try';

// this를 안 쓰는 경우 class 밖에 빼서 쓴다.
function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  // 내가 만든 함수는 화살표 함수로 만들자.
  onSubmitForm = (e) => {
    const { answer, value, tries } = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      // setState를 함수 형태로 작성하면 이전 state를 가져와서 활용할 수 있다.
      // 자유도가 상승하여 미세한 동작 설정 가능
      // 그렇기 때문에 Javascript는 일급 함수, High Order Function 이라고 불린다.
      this.setState((prevState) => {
        return {
          result: '홈런',
          tries: [...prevState.tries, { try: value, result: '홈런!' }],
        }
      })
      alert('게임을 다시 시작합니다.');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else { // 답 틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        })
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다!`}],
            value: '',
          }
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // createRef 방식
  inputRef = createRef();

  // 이전 방식(ref={this.onInputRef})
  // inputRef;

  // onInputRef = (c) => {
  //   // 이 사이에 다른 동작 추가 가능하기 때문에 자유도가 높다.
  //   this.inputRef = c;
  // }

  render() {
    // [주의!] render 안에서는 this.setState를 절대로 사용하지 말자(무한 루프에 빠짐...)
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          {/*
            jsx에서 input의 value를 설정하려면 아래 두 구문 중 하나로 해야 한다.
            value={this.state.value} onChange={this.onChangeInput}
            defaultValue={this.state.value}
          */}
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return (
              <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
            );
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;