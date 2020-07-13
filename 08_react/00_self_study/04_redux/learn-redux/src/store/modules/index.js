// (1-5) 여러 reducer 합치기
// redux의 내장함수인 combineReducers 를 사용해서 리듀서를 하나로 합치는 작업을 한다.
// 여러 개로 나뉘어진 리듀서들을 서브 리듀서 라고 부르고, 하나로 합쳐진 리듀서를 루트 리듀서 라고 부른다.
import { combineReducers } from 'redux';
import counter from './counter';
import waiting from './waiting';

export default combineReducers({
  counter,
  waiting
})