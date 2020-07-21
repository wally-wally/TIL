import React, { useRef, useState, useCallback } from 'react';
import produce from 'immer';

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  // input 수정을 위한 함수
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(
      produce(draft => {
        draft[name] = value;
      })
    );
  }, []);

  // form 등록을 위한 함수
  const onSubmit = useCallback(e => {
    e.preventDefault();
    const info = {
      id: nextId.current,
      name: form.name,
      username: form.username
    };

    // array에 새 항목 등록
    setData(
      produce(draft => {
        draft.array.push(info);
      })
    );

    // form 초기화
    setForm({
      name: '',
      username: ''
    });
    nextId.current += 1;
  }, [form.name, form.username]);

  // 항목을 삭제하는 함수
  // immer 적용 전
  // const onRemove = useCallback(id => {
  //   setData({
  //     ...data,
  //     array: data.array.filter(info => info.id !== id)
  //   });
  // }, [data]);

  // immer 적용 후
  // 아래와 같이 immer를 적용했을 때 코드가 더 복잡해지는 경우도 있으니 상황에 맞게 immer를 사용하자.
  const onRemove = useCallback(id => {
    setData(
      produce(draft => {
        draft.array.splice(draft.array.findIndex(info => info.id === id), 1);
      })
    );
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name="username"
          placeholder="ID"
          value={form.username}
          onChange={onChange}
        />
        <input 
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li
              key={info.id}
              onClick={() => onRemove(info.id)}
            >
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;