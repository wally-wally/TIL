import React, { useState, Fragment } from 'react';

const IterationSample = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'wally' },
    { id: 2, name: 'hong' },
    { id: 3, name: 'mike' },
    { id: 4, name: 'sally' }
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(users[users.length - 1].id + 1); // 새로운 항목을 추가할 때 사용할 id

  const onChange = e => setInputText(e.target.value);
  const onClick = () => {
    // 배열에 새 항목을 추가할 때 push 함수 대신에 concat을 사용했다.
    // react에서 상태를 업데이트할 때는 불변성 유지를 해 주기 위해 기존 상태를 그대로 두면서
    // 새로운 값을 상태로 설정해야 한다.
    // 즉, 바뀌지 않는 값들은 그대로 유지한다는 의미이다.
    const nextUsers = users.concat({
      id: nextId, // nextId 값을 id로 설정
      name: inputText
    });
    setNextId(nextId + 1); // nextId 값에 1을 더함
    setUsers(nextUsers); // users 값을 업데이트
    setInputText(''); // inputText를 비움
  }

  const onRemove = id => {
    const nextUsers = users.filter(user => user.id !== id); // filter 함수를 이용해서 선택한 항목을 제거한다.
    setUsers(nextUsers);
  }

  const userList = users.map(user =>
    <li key={user.id}>
      {user.name}
      {/*
        컴포넌트가 처음 렌더링될 때는 user가 undefined 이므로
        user.id 값을 읽어 오는 과정에서 오류가 발생한다.
        이를 해결하기 위해 화살표 함수 문법을 사용해서 새로운 함수를 만들고
        그 내부에서 user.id 값을 읽으면 오류가 발생하지 않는다.
        (App.js의 () => this.scrollBox.scrollToBottom() 부분과 동일한 내용)
      */}
      <button
        style={{'marginLeft': '8px'}}
        onClick={() => onRemove(user.id)}
      >제거</button>
    </li>
  );
  return (
    <Fragment>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{userList}</ul>
    </Fragment>
  );
};

export default IterationSample;