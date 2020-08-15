import React, { useState} from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component';

// React.lazy는 컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩할 수 있게 해 주는 유틸 함수이다.
// const SplitMe = React.lazy(() => import('./SplitMe'));

// Loadable Components는 코드 스플리팅을 편하게 하도록 도와주는 서드파티 라이브러리이다.
// 이 라이브러리의 이점은 서버 사이드 렌더링을 지원한다는 것이다.
// 만약 서버 사이드 렌더링을 할 계획이 없다면 React.lazy와 Suspense로 구현하고,
// 계획이 있다면 Loadable Components를 사용해야 한다.
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  }
  // 마우스 커서를 Hello React! 위에 올리기만 해도 로딩이 시작된다.
  // 그리고 클릭했을 때 렌더링이 된다.
  const onMouseOver = () => {
    SplitMe.preload();
  }
  // 상단에서 import를 사용하지 않고 import() 함수 형태로 메서드 안에서 사용하면,
  // build시 파일을 따로 분리시켜서 저장한다.
  // 이렇게 구성하면 실제 함수가 필요한 지점에 파일을 불러와서 함수를 사용할 수 있다.
  // const onClick = () => {
  //   import('./notify').then(result => result.default());
  // }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>Hello React!</p>
        {/*
          Suspense는 리액트 내장 컴포넌트로서 코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고,
          로딩이 끝나지 않았을 때 보여 줄 UI를 fallback props를 통해 설정할 수 있다.
        */}
        {/* <Suspense fallback={<div>loading...</div>}>
          {visible && <SplitMe />}
        </Suspense> */}
        {visible && <SplitMe />}
      </header>
    </div>
  );
}

export default App;
