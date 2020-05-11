# :page_facing_up: React CRUD Basic

---

:warning: <b>본격적으로 시작하기 전에...</b>

- 해당 프로젝트는 Visual Studio Code 에디터로 진행되었고 `Reactjs code snippets` extensions를 미리 설치하는 것을 권장드립니다.

---

<br>

## 1. input 상태 관리

`App.js`

- `Reactjs code snippets`을 미리 설치하면 빈 파일에서 `rcc` 만 입력하고 `Enter`를 누르면 클래스형 컴포넌트가 자동으로 작성되고 `rsc`를 입력하고 `Enter`를 누르면 함수형 컴포넌트가 자동으로 작성된다.

```react
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  render() {
    return (
      <div>
        <PhoneForm />
      </div>
    );
  }
}

export default App;
```

<br>

`src` > `PhoneForm.js`

- state의 상태를 변화시키기 위해서는 반드시 `.setState()`를 사용한다.
- input이 여러 개인 경우 작성법
  - `[e.target.name]`으로 작성하면 input 태그안에 정의된 name의 값에 따라 state의 값이 변화된다.
  - 참고자료 <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer" target="_blank">(계산된 속성명 - MDN 공식문서)</a>

```react
import React, { Component } from 'react';

class PhoneForm extends Component {

  state = {
    name: '',
    phone: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form>
        <input
          name="name"
          placeholder="이름"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <input
          name="phone"
          placeholder="전화번호"
          onChange={this.handleChange}
          value={this.state.phone}
        />
        <div>
          {this.state.name} | {this.state.phone}
        </div>
      </form>
    );
  }
}

export default PhoneForm;
```

<br>

## 2. 배열에 데이터 추가

`App.js`

- 자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달할 때는 부모 컴포넌트에서 `handleCreate()` 메서드를 이용한다.
- 이 메서드를 자식 컴포넌트한테 props로 전달하고 props로 전달한 함수를 호출시켜서 이 데이터 값이 `App.js` 로 전달되게 한다.
- <b>react의 불변성 특징을 유지하기 위해 배열에 데이터를 삽입할 때는 기존 배열을 수정하는 `.push()` 대신에 `.concat()`을 사용해야한다.</b>
  - 즉, 기존의 배열이나 객체는 유지한 채 새로 들어오는 배열이나 객체를 주입해줘야한다.
- id 값은 배열의 각 원소를 랜더링 할 대 key 값으로 고유값이 필요한데 아래 코드와 같이 state 안에 선언하지 않은 이유는 랜더링해서 보여주는 값이 아니므로 굳이 state에 넣을 필요가 없다.

```react
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {

  id = 0

  state = {
    information: [],
  }

  handleCreate = (data) => {
    console.log(data) // {name: "aaa", phone: "123"}와 같은 형태로 데이터가 넘어옴
    const { information } = this.state
    this.setState({
      // 방법(1)
      // information: information.concat({
      //   ...data,
      //   id: this.id++
      // })

      // 방법(2)
      // information: information.concat({
      //   name: data.name,
      //   phone: data.phone,
      //   id: this.id++
      // })

      // 방법(3)
      information: information.concat(Object.assign({}, data, {
        id: this.id++
      }))
    })
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        {JSON.stringify(this.state.information)}
      </div>
    );
  }
}

export default App;
```

<br>

`src` > `PhoneForm.js`

- `form` 태그로 `submit` 동작을 수행하면 기본적으로 새로고침이 되기 때문에 이를 막기 위해 `e.preventDefault()` 함수 구문을 추가한다.

```react
import React, { Component } from 'react';

class PhoneForm extends Component {

  state = {
    name: '',
    phone: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault() // 등록 버튼 눌렀을 때 새로고침 되는 현상 방지
    this.props.onCreate(this.state) // 부모에게 받은 onCreate 함수를 호출한다.
    // 등록 후 input 값 초기화
    this.setState({
      name: '',
      phone: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="이름"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <input
          name="phone"
          placeholder="전화번호"
          onChange={this.handleChange}
          value={this.state.phone}
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;
```

<br>

## 3. 배열 랜더링 : `.map()`

`App.js`

```react
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  id = 0

  state = {
    information: [],
  }

  handleCreate = (data) => {
    const { information } = this.state
    this.setState({
      information: information.concat(Object.assign({}, data, {
        id: this.id++
      }))
    })
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList data={this.state.information} /> 
      </div>
    );
  }
}

export default App;
```

<br>

`src` > `PhoneInfo.js`

```react
import React, { Component } from 'react';

class PhoneInfo extends Component {
  render() {
    const { name, phone, id } = this.props.info;

    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    }
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
      </div>
    );
  }
}

export default PhoneInfo;
```

<br>

`src` > `PhoneInfoList.js`

- 배열 랜더링할 때 `key`가 없어도 랜더링은 되지만  `key`가 있어야 element를 추가, 수정, 삭제할 때 효율적으로 수행하기 위해 사용된다.

```react
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: []
  }
  
  render() {
    const { data } = this.props;
    const list = data.map(
      info => (<PhoneInfo info={info} key={info.id} />)
    );
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default PhoneInfoList;
```

<br>

## 4. 배열에서 데이터 제거 : `.slice()`, `.filter()`

:heavy_check_mark: <b>`.slice()`로 배열의 중간 데이터 제거 또는 수정하기</b>

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
numbers.slice(0, 2); // [1, 2]
numbers.slice(0, 2).concat(numbers.slice(3, 6)); // [1, 2, 4, 5, 6]
[
  ...numbers.slice(0, 2),
  10,
  ...numbers.slice(3, 6)
] // [1, 2, 10, 4, 5, 6]
```

<br>

:heavy_check_mark: <b>`.filter()`로 배열의 중간 데이터 제거 또는 수정하기</b>

- `.filter()`는 기존의 배열을 수정하지 않기 때문에 react의 불변성을 지키면서 데이터를 제거 또는 수정할 수 있다.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
numbers.filter(number => number > 3); // [4, 5, 6]
numbers.filter(number => number !== 3); // [1, 2, 4, 5, 6]
```

<br>

`App.js`

```react
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  id = 0

  state = {
    information: [],
  }

  handleCreate = (data) => {
    const { information } = this.state
    this.setState({
      information: information.concat(Object.assign({}, data, {
        id: this.id++
      }))
    })
  }

  // handleRemove() 함수 추가
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList
          data={this.state.information}
          onRemove={this.handleRemove}
        /> 
      </div>
    );
  }
}

export default App;
```

<br>

`src` > `PhoneInfoList.js`

```react
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: []
  }
  
  render() {
    const { data, onRemove } = this.props;
    const list = data.map(
      info => (
        <PhoneInfo
          onRemove={onRemove}
          info={info}
          key={info.id}
        />
      )
    );
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default PhoneInfoList;
```

<br>

`src` > `PhoneInfo.js`

```react
import React, { Component } from 'react';

class PhoneInfo extends Component {

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  render() {
    const { name, phone } = this.props.info;

    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    }
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
```

<br>

## 5. 배열 안의 데이터 수정 : `.slice()`, `.map()`

:heavy_check_mark: <b>`.slice()`로 데이터 수정하기</b>

```javascript
const numbers = [1, 2, 3, 4, 5];
[
  ...numbers.slice(0, 2),
  9,
  ...numbers.slice(3, 5)
] // [1, 2, 9, 4, 5]
```

<br>

:heavy_check_mark: <b>`.map()`으로 데이터 수정하기</b>

```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.map(number => {
  if (number === 3) {
    return 9;
  }
})
```

<br>

`App.js`

```react
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  id = 0

  state = {
    information: [],
  }

  handleCreate = (data) => {
    const { information } = this.state
    this.setState({
      information: information.concat({
        ...data,
        id: this.id++
      })
    })
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => {
          if (info.id === id) {
            return {
              id,
              ...data
            };
          }
          return info;
        }
      )
    });
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList
          data={this.state.information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        /> 
      </div>
    );
  }
}

export default App;
```

<br>

`src` > `PhoneInfoList.js`

```react
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: []
  }
  
  render() {
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(
      info => (
        <PhoneInfo
          onRemove={onRemove}
          onUpdate={onUpdate}
          info={info}
          key={info.id}
        />
      )
    );
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default PhoneInfoList;
```

<br>

`src` > `PhoneInfo.js`

- `handleToggleEdit()` 함수 로직
  - editing 값이 true => false로 될 때 : `onUpdate()` 함수로 부모 컴포넌트에게 알린다.
  - editing 값이 false => true로 될 때 : props로 받은 info의 name과 phone 값을 이 컴포넌트의 state의 name과 phone에 각각 넣어준다.

```react
import React, { Component, Fragment } from 'react';

class PhoneInfo extends Component {

  state = {
    editing: false, // 수정모드 설정 관련 변수
    name: '',
    phone: ''
  }

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  handleToggleEdit = () => {
    const { info, onUpdate } = this.props;
    if (this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone,
      })
    } else {
      this.setState({
        name: info.name,
        phone: info.phone,
      })
    }
    this.setState({
      editing: !this.state.editing,
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { name, phone } = this.props.info;
    const { editing } = this.state;
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    }
    return (
      <div style={style}>
        {/* state의 editing 값에 따라 input box 또는 div 태그로 보여진다. */}
        {
          editing ? (
            <Fragment>
              <div>
                <input
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
              <div>
                <input
                  name="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div><b>{name}</b></div>
              <div>{phone}</div>
            </Fragment>
          )
        }
        <button onClick={this.handleRemove}>삭제</button>
        <button onClick={this.handleToggleEdit}>
          { editing ? '적용' : '수정 '}
        </button>
      </div>
    );
  }
}

export default PhoneInfo;
```

