import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';
import Say from './Say';
import EventPractice from './EventPractice';
import EventPractice2 from './EventPractice2';
import EventPractice3 from './EventPractice3';
import ValidationSample from './ValidationSample';
import ScrollBox from './ScrollBox';
import IterationSample from './IterationSample';

class App extends Component {
  render() {
    return (
      <div>
        <div className="chapter">3장: 컴포넌트</div>
        <Counter />
        <hr />
        <Say />
        <hr />
        <div className="chapter">4장: 이벤트 핸들링</div>
        <EventPractice />
        <EventPractice2 />
        <EventPractice3 />
        <hr />
        <div className="chapter">5장: ref 속성으로 DOM에 이름 달기</div>
        <ValidationSample />
        <div>
          <ScrollBox ref={ref => this.scrollBox = ref} />
          <button onClick={() => this.scrollBox.scrollToBottom() }>
            맨 밑으로
          </button>
        </div>
        <hr />
        <div className="chapter">6장: 컴포넌트 반복</div>
        <IterationSample />
      </div>
    )
  }
};

export default App;