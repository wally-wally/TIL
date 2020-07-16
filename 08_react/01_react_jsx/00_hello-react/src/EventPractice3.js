import React, { useState } from 'react';

const EventPractice3 = () => {
  // 가독성 안 좋은 코드
  // const [username, setUsername] = useState('');
  // const [message, setMessage] = useState('');
  // const onChangeUsername = e => setUsername(e.target.value);
  // const onChangeMessage = e => setMessage(e.target.value);
  // const onClick = () => {
  //   alert(`${username}: ${message}`);
  //   setUsername('');
  //   setMessage('');
  // }
  // const onKeyPress = e => {
  //   if (e.key === 'Enter') {
  //     onClick();
  //   }
  // };

  // 가독성 좋은 코드
  const [form, setForm] = useState({
    username: '',
    message: ''
  })
  const { username, message } = form;
  const onChange = e => {
    const nextForm = {
      ...form, // 기존의 form 내용을 이 자리에 복사한 뒤
      [e.target.name]: e.target.value // 원하는 값을 덮어 씌우기
    };
    setForm(nextForm);
  }
  const onClick = () => {
    alert(`${username}: ${message}`);
    setForm({
      username: '',
      message: ''
    })
  }
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트 연습3 - 함수형 컴포넌트</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        // onChange={onChangeUsername}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 보세요"
        value={message}
        // onChange={onChangeMessage}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice3;