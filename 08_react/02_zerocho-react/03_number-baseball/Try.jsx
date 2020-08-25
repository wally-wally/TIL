import React, { memo, useState } from 'react';

const Try = ({ tryInfo }) => {
  // props로 받은 값은 자식 쪽에서 값을 바꿀 수 없다.
  // 반드시 부모 쪽에서 바꾸자.
  // 그럼에도 불구하고 간혹 자식 쪽에서 바꾸고 싶다면 직접 값을 바꾸는 것이 아니라
  // 아래와 같이 useState로 state를 만든 후에 setResult와 같은 것으로 바꿔야 한다.

  // const [result, setResult] = useState(tryInfo.result);
  
  // const onClick = () => {
  //   setResult('1');
  // }
  
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
};

export default memo(Try);