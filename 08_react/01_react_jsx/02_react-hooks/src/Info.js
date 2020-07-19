import React, { useEffect, useReducer } from 'react';
import useInputs from './useInputs';

// 이와 같이 코드를 작성하면 input 태그가 많아져도 코드를 짧고 깔끔하게 유지할 수 있다.
// function reducer(state, action) {
//   return {
//     ...state,
//     [action.name]: action.value
//   };
// }

const Info = () => {
  // useState 함수는 하나의 상태 값만 관리할 수 있으므로
  // 여러 개의 상태 값을 관리하려면 useState를 관리할 상태 개수만큼 사용하면 된다.
  // const [name, setName] = useState('');
  // const [nickname, setNickname] = useState('');

  // useEffect hook
  // 컴포넌트가 rendering 될 때마다 특정 작업을 수행하도록 설정할 수 있다.
  // 클래스형 컴포넌트의 componentDidMount 메서드와 componentDidUpdate 메서드를 합친 것으로 봐도 무방하다.
  // useEffect(() => {
  //   console.log('rendering complete');
  //   console.log(name);
  // }, [name]);
  // useEffect 두 번째 인자로 빈 배열을 넣으면 처음 rendering 될 때만 실행하고 update 될 때는 실행하지 않는다.
  // 만약 특정 값이 업데이트될 때만 실행하고 싶으면 배열 안에 해당 변수명을 넣으면 된다.

  // cleanup 함수 적용한 useEffect
  // useEffect는 기본적으로 rendering되고 난 직후마다 실행되며, 두 번째 인자로 배열에 어떤 것을 넣는지에 따라 실행되는 조건이 달라진다.
  // 컴포넌트가 unMount되기 전이나 update되기 직전에 특정 작업을 실행하고 싶으면 useEffect에서 뒷정리(cleanup)함수를 반환해 줘야 한다.
  useEffect(() => {
    console.log('effect');
    return () => {
      console.log('cleanup');
    };
  }, []);
  // 오직 unMount될 때만 cleanup 함수를 실행하고 싶다면 useEffect 함수의 두 번째 인자로 빈 배열을 넣으면 된다.

  // const onChangeName = e => {
  //   setName(e.target.value);
  // };

  // const onChangeNickname = e => {
  //   setNickname(e.target.value);
  // };

  // useReducer를 사용하면 기존에 useState를 여러 번 호출해서 사용할 필요없이 한 번의 호출로 작성할 수 있다.
  // 기존의 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고 e.target.name을 참조해서 setState를 해 준 것과 유사한 방식으로 작업을 처리할 수 있다.
  // const [state, dispatch] = useReducer(reducer, {
  //   name: '',
  //   nickname: ''
  // });
  // const onChange = e => {
  //   dispatch(e.target);
  // }

  // 커스텀 Hooks
  const [state, onChange] = useInputs({
    name: '',
    nickname: ''
  });
  const { name, nickname } = state;

  return (
    <div>
      <div>
        {/* useState */}
        {/* <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} /> */}

        {/* useReducer */}
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;