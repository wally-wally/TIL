import React from 'react';

// props에 대한 타입을 선언할 때는 interface 또는 type 을 사용하면 되고
// 한 프로젝트 내에서 일관성을 지켜서 하나만 사용하는 것을 권장한다.
type GreetingsProps = {
  name: string;
  mark: string;
  optional?: string; // 컴포넌트에 생략할 수 있는 props를 설정하려면 ?를 추가하면 된다.
  onClick: (name: string) => void; // 아무것도 리턴하지 않는 함수를 props로 받아옴
}

// React.FC는 가급적 사용하지 말고 아래와 같이 작성하자.
// 화살표 함수로 할지 function 키워드로 사용할 지는 본인 마음
function Greetings({ name, mark, optional, onClick }: GreetingsProps) {
  const handleClick = () => onClick(name);
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  );
}

// React.FC를 사용하면 defaultProps를 쓴 의미가 없어서 App.tsx에서 Greetings 컴포넌트에 mark가 없다고 오류가 뜬다...
Greetings.defaultProps = {
  mark: '!'
}

export default Greetings;