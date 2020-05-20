# Redux

---

:warning: <b>Reference</b>

- 이 컨텐츠의 내용은 velopert님의 `Redux (3) 리덕스를 리액트와 함께 사용하기` 편을 참고했습니다. (출처 : <a href="https://velog.io/@velopert/Redux-3-%EB%A6%AC%EB%8D%95%EC%8A%A4%EB%A5%BC-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%99%80-%ED%95%A8%EA%BB%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-nvjltahf5e" target="_blank">(바로이동)</a>)

---

<br>

## :one: 모듈 생성

---

:card_file_box:  <b>파일 위치</b>

- `(1) 액션 타입 정의` ~ `(4) 리듀서(reducer) 작성` : `src/store/modules/counter.js`
- `(5) 리듀서 합치기` : `src/store/modules/index.js`

---

### (1) 액션 타입 정의

- 카운터 쪽에서 사용할 액션들을 작성한다.

```javascript
const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
```

- Ducks 패턴을 사용해서 액션 이름을 지을 때 문자열의 앞부분에 모듈 이름을 넣는다.
- 다른 모듈에서  작성하게 될 수도 있는 액션들과 충돌되지 않게 하기 위함이다.

<br>

### (2) 액션 생성함수 정의

- 액션 생성함수 앞에 export를 꼭 붙여야 나중에 컴포넌트에서 redux를 연동하고 불러와서 사용한다.

```javascript
export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
```

<br>

### (3) 초기상태 정의

```javascript
const initialState = {
  color: 'red',
  number: 0,
};
```

<br>

### (4) 리듀서(reducer) 작성

- 리듀서 : 변화에 관련된 작업을 하는 함수이다.
- 리듀서는 스토어의 상태와 액션 객체를 인자로 받아 변화를 일으키며, 함수의 리턴값은 새로운 상태 이다.
- 리듀서 함수는 앞에 반드시 export default를 작성해야 한다.
- 나중에 스토어를 만들 때 이 함수를 필요로 한다.

```javascript
export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case INCREMENT:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}
```

---

:heavy_check_mark: <b>reducer 함수가 만족해야 하는 '순수한 함수'의 조건 세 가지</b>

1. reducer 함수 내에서 비동기 작업을 수행하면 안 된다.
2. reducer 함수로 들어온 인수를 변경해서는 안 된다.
3. reducer 함수로 들어온 인수가 같다면 결과는 항상 동일해야한다.

---

<br>

### (5) 리듀서 합치기

- 지금까지는 하나의 리듀서만 만들었지만 추후 여러 개의 리듀서가 만들어지면 하나로 합치는 작업을 해야 한다.
- redux의 내장함수인 combineReducers 를 사용해서 리듀서를 하나로 합치는 작업을 할 수 있다.
- 여러 개로 나뉘어진 리듀서들을 서브 리듀서 라고 부르고, 하나로 합쳐진 리듀서를 루트 리듀서 라고 부른다.

```javascript
import { combineReducers } from 'redux';
import counter from './counter';

export default combineReducers({
  counter,
  // 추후 다른 리듀서들을 이 곳에 추가함
})
```

<br>

## :two: 스토어 생성

- 스토어 생성 시 redux의 규칙 중 '하나의 애플리케이션 안에는 하나의 스토어가 있다.'를 만족해야 한다.
- 그래서 App이 시작되는 src/index.js에서 딱 한 번만 스토어를 만들면 된다.

```javascript
import { createStore } from 'redux';
import rootReducer from './store/modules';
```

- 아래 구문을 작성해서 스토어 생성 후 현재 값을 확인할 수 있다.(확인 후에는 주석 처리)

```javascript
const store = createStore(rootReducer);
console.log(store.getState());
```

![캡처01](https://user-images.githubusercontent.com/52685250/82392184-2aa16b00-9a7e-11ea-863e-3f350d0ace89.JPG)

- 리덕스를 더 편리하게 사용하기 위해 Google Chrome Extension 중 `Redux Devtools`가 있다. <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd" target="_blank">(이곳)</a> 에서 설치하고 스토어를 만들 때 아래와 같이 코드를 작성하면 스토어의 상태를 볼 수 있다.

```javascript
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);
console.log(store.getState());
```

![캡처02](https://user-images.githubusercontent.com/52685250/82392187-2bd29800-9a7e-11ea-8d56-8cfb38254b82.JPG)

<br>

## :three: 스토어 연동

### (1) Provider를 이용해서 리액트에 스토어 연동

- 리액트 프로젝트에서 스토어를 연동할 때는 `react-redux` 라이브러리 안에 있는 `Provider` 라는 컴포넌트를 사용한다.
- 기존의 JSX를 Provider로 감싸고, props로 store를 Provider 한테 넣어준다.

```react
// Provider 불러오기
import { Provider } from 'react-redux';

// 중략

// ReactDOM 부분에 아래와 같이 작성
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
```

<br>

### (2) `connect` 함수를 이용해서 컴포넌트에 스토어 연동 - `Palette Container`

- `Presentational Component` VS `Container Component`
  - `Presentational Component` : 오직 보여주는 용도로만 사용되는 컴포넌트이므로 이 곳에서 스타일들이 정의된다.
  - `Container Component` : Presentational Component와 Container Component들을 관리함
- 그래서 리덕스와 연동된 컴포넌트 (`PaletteContainer.js`)를  `Container Component` 라고 부른다.
- 참고로 단순히 단순히 props를 전달해주면 그대로 보여주는 컴포넌트를 `Presentational Component` 라고 부른다.

- `src/containers/PaletteContainer.js`

```react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Palette from '../components/Palette';
import { changeColor } from '../store/modules/counter';

class PaletteContainer extends Component {
  handleSelect = color => {
    const { changeColor } = this.props;
    console.log('what');
    changeColor(color);
  }

  render() {
    const { color } = this.props;
    return <Palette onSelect={this.handleSelect} selected={color} />;
  }
}

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  color: state.counter.color,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  changeColor: color => dispatch(changeColor(color)),
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때는 connect 함수를 사용한다.
// mapStateToProps : 이 함수의 파라미터를 전달해 주는 역할
// 스토어 안에 있는 값을 props로 전달하고
// mapDispatchProps는 액션 생성함수를 props로 전달해준다.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteContainer)
```

- 컨테이너 컴포넌트를 만들 땐 `react-redux` 안에 있는 `connect` 함수를 이용한다.
- 이 함수의 파라미터에 전달해주는 `mapStateToProps` 는 스토어 안에 들어있는 값을 props로 전달해주고, `mapDispatchToProps` 는 액션 생성함수들을 props로 전달해준다.
  - 참고로 액션 생성함수는 호출한다고 해서 상태에 변화가 일어나는 것이 아니라 단순히 액션 객체를 생성하는 것에 불과하다. 액션 객체를 스토어한테 전달해주어야 상태에 변화가 발생한다.
- 여기 있는 `mapDispatchToProps` 에서는, `color` 를 파라미터로 받아와서, 그 값을 가지고 `CHANGE_COLOR` 액션 객체를 생성한다음에 스토어한테 디스패치 하는 함수를, 컴포넌트의 props 로 전달해주는 것이다.
- `connect` 함수가 호출되면, 반환되는 값은 특정 컴포넌트에 설정된 props 를 전달해주는 함수이다.
  - `connect()` 를 호출해서 반환받은 함수에, `PaletteContainer` 를 파라미터로 넣어서 호출한것이다 라고 이해하면 된다.

- 컴포넌트를 만든 후 `App.js`에서 기존의 `Palette` 컴포넌트를 `PaletteContainer` 컴포넌트로 대체한다.

```react
import React, { Component } from 'react';

import './App.css';
import Counter from './components/Counter';
// import Palette from './components/Palette';
import WaitingList from './components/WaitingList';
// (3-2) PaletteContainer 컴포넌트 불러오기
import PaletteContainer from './containers/PaletteContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Palette selected="red" /> */}
        <PaletteContainer />
        <Counter value={0} color="red" />
        <WaitingList />
      </div>
    );
  }
}

export default App;
```

- 그리고나서 `Palette` 컴포넌트에서 `PaletteItem`에 `onClick` 함수를 제대로 구현해주면 팔테르에서 다른 색상을 클릭하면 제대로 선택된다.

```react
// <PaletteItem /> 부분에 아래 구문 추가
onClick={() => onSelect(color)}
```

![캡처03](https://user-images.githubusercontent.com/52685250/82395660-eff00080-9a86-11ea-9c74-d9ef9647014c.JPG)

<br>

## :four: `CounterContainer` 만들기

### (1) CounterContainer 만들기

- `src/containers/CounterContainer.js`

```react
// (4-1) CounterContainer 만들기
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter';

class CounterContainer extends Component {
  handleIncrement = () => {
    this.props.increment();
  }

  handleDecrement = () => {
    this.props.decrement();
  }

  render() {
    const { color, number } = this.props;
    return (
      <Counter
        color={color}
        value={number}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
      />
    );
  }
}
const mapStateToProps = state => ({
  color: state.counter.color,
  number: state.counter.number,
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);
```

:heavy_exclamation_mark: <b>`mapStateToProps`에 destructuring 적용</b>

```react
// before
const mapStateToProps = state => ({
  color: state.counter.color,
  number: state.counter.number,
});

// after
const mapStateToProps = ({ counter }) => ({
  color: counter.color,
  number: counter.number,
});
```

:heavy_exclamation_mark: <b>`mapDispatchToProps`에 `bindActionCreators` 함수를 사용해서 dispatch 간결하게 작성</b>

- 아래와 같이 작성하면 기존에 작성했던 `actionCreator: (...params) => dispatch(actionCreator(...params)` 에 해당하는 작업을 자동으로 해준다.
  - 만약에 액션 생성함수가 파라미터를 필요로 하는것이더라도, 정상적으로 작동한다.

```react
// 상단에 bindActionCreators 관련 import 구문 추가
import { bindActionCreators } from 'redux';

// 중략

// before
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
})

// after
const mapDispatchToProps = dispatch => ({
  bindActionCreators({ increment, decrement }, dispatch);
})
```

:heavy_exclamation_mark: <b>`mapDispatchToProps`에 dispatch 간결하게 작성하는 다른 방법</b>

- `mapDispatchToProps` 를 함수형태가 아닌 액션 생성함수로 이뤄진 `객체`를 전달해주면 `connect`가 발생하게 될 때 `bindActionCreators` 를 자동으로 해준다.

```react
// before
const mapDispatchToProps = dispatch => ({
  bindActionCreators({ increment, decrement }, dispatch);
})

// after (상단에 기존에 작성한  bindActionCreators 관련 import 구문 삭제해도 됨 )
const mapDispatchToProps = { increment, decrement };
```

<br>

### (2) CounterContainer 적용

- `src/App.js`

```react
import React, { Component } from 'react';

import './App.css';
import WaitingList from './components/WaitingList';
import PaletteContainer from './containers/PaletteContainer';
// (4-2) CounterContainer 컴포넌트 불러오기(기존에 있던 Counter 관련 import 구문 삭제)
import CounterContainer from './containers/CounterContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PaletteContainer />
        {/* 기존에 있던 Counter 컴포넌트 삭제 */}
        <CounterContainer />
        <WaitingList />
      </div>
    );
  }
}

export default App;
```

![캡처04](https://user-images.githubusercontent.com/52685250/82398540-0baad500-9a8e-11ea-8ba1-ff99270d80ba.JPG)

<br>

## :five: 대기자 명단 만들기 - CRUD

### (1) 액션 타입, 액션 생성함수 정의

- 파일 위치 : `src/store/modules/waiting.js`
- 팔레트와 카운터를 구현하면서 익힌 방법으로 액션 타입과 액션 생성함수를 정의해보자.

```javascript
// 액션 타입 정의
const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // input 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감

// FSA 규칙을 준수하는 액션 생성함수 정의
export const changeInput = text => ({ type: CHANGE_INPUT, payload: text })
export const create = text => ({ type: CREATE, payload: text })
export const enter = id => ({ type: ENTER, payload: id })
export const leave = id => ({ type: LEAVE, payload: id })
```

---

:heavy_check_mark: <b>FSA 규칙</b>

- FSA 규칙은 읽기 쉽고, 유용하고, 간단한 액션 객체를 만들기 위해서 나온 규칙이다.
- 필수 조건
  - 순수 자바스크립트 객체이며,
  - type 값이 있어야 한다.
- 선택 필요 사항
  - payload : FSA 규칙을 따르는 액션 객체는, 액션에서 사용할 파라미터의 필드명을 payload로 통일 시키고 이를 통해 액션 생성함수를 훨씬 더 쉽게 작성할 수 있다.
  - error: 에러가 발생할 때 넣을 수 있는 값
  - meta: 상태 변화에 있어서 무조건 필요한 값은 아니지만 참조할만한 값

---

<br>

### (2) `createAction`

- `createAction` 함수는 `redux-actions`에 있고 이를 사용하면 액션 생성함수를 가독성이 좋게 작성할 수 있다.

```javascript
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => text);
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);
```

- 위 코드에서 두 번째 파라미터로 받는 부분은 `payloadCreator`로서 payload를 어떻게 정할 지 결정한다.
  - 만약에 이 파라미터를 생략하면 기본적으로 `payload => payload` 형태로 되므로 생략해서 작성할 수 있지만 해당 액션에서 어떠한 값을 payload 로 설정했는지 헷갈릴 수 있으므로 가급적이면 이 파라미터도 함께 작성하는 것이 좋다.
- 현재 상황에서는 데이터를 새로 생성할 때마다 고유 id 값을 주었는데 이전에 리듀서를 살펴볼 때 리듀서는 `순수한 함수` 이어야 한다고 했다.
  - 즉, <b>데이터에 고유 id를 주는 작업은 리듀서에서 발생하면 안되고 액션이 스토어에 dispatch 되기 전에 이뤄져야 한다.</b>
- 이와 같이 수행되기 위해 액션 생성함수를 아래와 같이 수정할 수 있다.

```javascript
let id = 3;
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

export default handleAction({});
```

- 그러면 아래와 같이 고유 id 값이 1씩 증가하면서 작동한다.

```
create('wally-wally');
{ type: CREATE, payload: { id: 3, text: 'wally-wally' } }
create('robert');
{ type: CREATE, payload: { id: 4, text: 'robert' } }
create('lisa');
{ type: CREATE, payload: { id: 5, text: 'lisa' } }
```

<br>

### (3) `handleActions`

- `waiting` 모듈의 초기 상태와 리듀서를 정의하는데 `counter` 모듈에서 구현한 리듀서는 switch / case 문을 이용해서 작성했다.
- 하지만 각 액션의 타입마다 return 되는 값을 정의해줘야해서 가독성도 떨어지고 불편한점이 많았다.
- 그래서 이를 해결하기 위해 `redux-action` 에 있는 `handleActions` 함수를 사용해 볼 것이다.

- 우선 초기 상태를 아래와 같이 정의하자.

```javascript
const initialState = {
  input: '',
  list: [
    {
      id: 0,
      name: '홍길동',
      entered: true,
    },
    {
      id: 1,
      name: '콩쥐',
      entered: false,
    },
    {
      id: 2,
      name: '팥쥐',
      entered: false,
    },
  ],
};
```

- 그 다음 `handleAction`을 이용해 리듀서를 작성해보자.

```javascript
import { handleActions } from 'redux-actions';

// 중략

export default handleActions(
  {}, initialState
);
```

- `handleActions`로 작성한 리듀서의 기본 form은 위와 같고 `{}` 안에 action.type에 따라 return 되는 값들을 작성해주면 된다.
- 그리고 react의 <b>불변성 유지</b> 특성을 지키기 위해 `concat`, `map`, `filter` 메서드를 이용해서 배열을 다뤘다.

```react
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
        entered: false,
      }),
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map(
        item => 
          item.id === action.payload
            ? { ...item, entered: !item.entered }
            : item
      ),
    }),
    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter(item => item.id !== action.payload),
    })
  }, initialState
);
```

- 그리고 나서 `store/modules/index.js`에서 루트 리듀서에 `waiting` 서브 리듀서를 추가해준다.

```javascript
import { combineReducers } from 'redux';
import counter from './counter';
import waiting from './waiting';

export default combineReducers({
  counter,
  waiting
})
```

<br>

### (4) `WaitingListContainer` 만들기

`src/containers/WaitingListContainer.js`

```react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as waitingActions from '../store/modules/waiting';
import WaitingList from '../components/WaitingList';

class WaitingListContainer extends Component {
  // input change event
  handleChange = e => {
    const { WaitingActions } = this.props;
    WaitingActions.changeInput(e.target.value);
  }
  // create event
  handleSubmit = e => {
    e.preventDefault();
    const { WaitingActions, input } = this.props;
    WaitingActions.create(input); // 대기자 등록
    WaitingActions.changeInput(''); // input value initialization
  }

  // enter event
  handleEnter = id => {
    const { WaitingActions } = this.props;
    WaitingActions.enter(id);
  }

  // leave event
  handleLeave = id => {
    const { WaitingActions } = this.props;
    WaitingActions.leave(id);
  }

  render() {
    const { input, list } = this.props;
    return (
      <WaitingList
        input={input}
        waitingList={list}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onEnter={this.handleEnter}
        onLeave={this.handleLeave}
      />
    );
  }
}

const mapStateToProps = ({ waiting }) => ({
  input: waiting.input,
  list: waiting.list,
})

const mapDispatchToProps = dispatch => ({
  WaitingActions: bindActionCreators(waitingActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingListContainer);
```

- 위 코드에서 `mapDispatchToProps` 부분이 기존에 작성했던 방식과 약간 다른데 위와 같이 작성하면 나중에 다양한 redux 모듈을 적용해야 하는 상황에서 유용하다.

```javascript
const mapDispatchToProps = dispatch => ({
  WaitingActions: bindActionCreators(waitingActions, dispatch),
  // AnotherActions: bindActionCreators(anotherActions, dispatch)
});
```

- `App.js`에서 `WaitingList`를 `WaitingListContainer`로 교체

```react
import React, { Component } from 'react';

import './App.css';
import PaletteContainer from './containers/PaletteContainer';
import CounterContainer from './containers/CounterContainer';
import WaitingListContainer from './containers/WaitingListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PaletteContainer />
        <CounterContainer />
        <WaitingListContainer />
      </div>
    );
  }
}

export default App;
```

<br>

### (5) `WaitingList` 컴포넌트 내부 구현

`src/components/WaitingList.js`

```react
import React from 'react';
import './WaitingList.css';

const WaitingItem = ({ text, entered, onEnter, onLeave }) => {
  return (
    <li>
      <div className={`text ${entered ? 'entered' : ''}`}>{text}</div>
      <div className="buttons">
        <button onClick={onEnter}>입장</button>
        <button onClick={onLeave}>나감</button>
      </div>
    </li>
  );
};

const WaitingList = ({ input, waitingList, onChange, onSubmit, onEnter, onLeave }) => {
  // 보여질 대기자 명단을 .map() 메서드를 이용해 컴포넌트 리스트로 변환
  const waitingItems = waitingList.map(w => (
    <WaitingItem
      key={w.id}
      text={w.name}
      entered={w.entered}
      id={w.id}
      onEnter={() => onEnter(w.id)}
      onLeave={() => onLeave(w.id)}
    />
  ));
  return (
    <div className="WaitingList">
      <h2>대기자 명단</h2>
      {/* form 과 input 에 이벤트 및 값 설정 */}
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button>등록</button>
      </form>
      <ul>{waitingItems}</ul> {/* 하드코딩된것을 컴포넌트 배열로 교체 */}
    </div>
  )
};

export default WaitingList;
```

:slightly_smiling_face: <b>최종 완성 형태</b>

![캡처05](https://user-images.githubusercontent.com/52685250/82406531-d6a87d80-9aa1-11ea-94ec-aabb2a8b642a.JPG)

<br>

## :six: 불변성 유지 - `Immer`

- `Immer` 라이브러리를 이용해서 불변성 유지를 지키면서 코드를 작성해보자.

- 우선 `yarn add immer`로 라이브러리를 설치해준다.
- 각 모듈 최상단에 `import produce from 'immer';` 작성
- `counter.js` (달라진 부분만 작성)

```javascript
export default function counter(state = initialState, action) {
  switch (action.type) {
    // (before)
    // case CHANGE_COLOR:
    //   return {
    //     ...state,
    //     color: action.color,
    //   };
    case CHANGE_COLOR:
      return produce(state, draft => {
        draft.color = action.color
      });
    case INCREMENT:
      return produce(state, draft => {
        draft.number++;
      });
    case DECREMENT:
      return produce(state, draft => {
        draft.number--;
      });
    default:
      return state;
  }
}
```

- `waiting.js` (달라진 부분만 작성)

```javascript
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => 
      produce(state, draft => {
        draft.input = action.payload;
      }),
    [CREATE]: (state, action) => 
      produce(state, draft => {
        draft.list.push({
          id: action.payload.id,
          name: action.payload.text,
          entered: false,
        });
      }),
    [ENTER]: (state, action) =>
      produce(state, draft => {
        const item = draft.list.find(item => item.id === action.payload);
        item.entered = !item.entered;
      }),
    [LEAVE]: (state, action) =>
      produce(state, draft => {
        draft.list.splice(
          draft.list.findIndex(item => item.id === action.payload), 1
        );
      }),
  }, initialState
);
```

