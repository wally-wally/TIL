import React from 'react';
import ReactDOM from 'react-dom';
// (2-1) 스토어 만들기
// 스토어 생성 시 redux의 규칙 중 '하나의 애플리케이션 안에는 하나의 스토어가 있다.'를 만족해야 한다.
// 그래서 App이 시작되는 src/index.js에서 딱 한 번만 스토어를 만들면 된다.
import { createStore } from 'redux';
import rootReducer from './store/modules';
// (3-1) Provider 불러오기
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// (2-2) 스토어 생성 후 현재 값 확인하기 (확인 후 주석처리)
// const store = createStore(rootReducer);
// console.log(store.getState());

// (2-3) 리덕스 개발자 도구 적용하기
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);
console.log(store.getState());

// (3-1) <App />을 Provider로 감싸고 props로 store를 Provider 한테 넣어준다.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
