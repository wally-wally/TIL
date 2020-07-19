import React, { useState } from 'react';
import Counter from './Counter';
import Info from './Info';
import Average from './Average';
import './App.css';

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="component-name">Counter 컴포넌트</div>
      <Counter />
      <hr />
      <div className="component-name">Info 컴포넌트</div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      {/* and 연산자(&&)를 이용해 visible이 true일 때 Info 컴포넌트가 보여지도록 코드 수정 */}
      {visible && <Info />}
      <hr />
      <div className="component-name">Average 컴포넌트</div>
      <Average />
    </div>
  );
};

export default App;