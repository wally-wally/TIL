# React create app

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

