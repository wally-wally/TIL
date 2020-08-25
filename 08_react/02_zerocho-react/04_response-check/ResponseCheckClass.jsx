import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        // startTime까지 state에 넣으면 rendering이 다시 되므로 그냥 this.startTime으로 설정함
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
      })
    } else if (state === 'now') { // 반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime - this.startTime],
        }
      })
    }
  }

  onReset = () => {
    this.setState({
      result: [],
    });
  }

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0
      ? null
      : <>
          <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
          <button onClick={this.onReset}>Reset</button>
        </>
  }

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}
        >
          {message}
        </div>
        {/* false, undefined, null은 jsx에서 태그없음을 의미한다. */}
        {this.renderAverage()}
      </>
    )
  }
}

export default ResponseCheck;