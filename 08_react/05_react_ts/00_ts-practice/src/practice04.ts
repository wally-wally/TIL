// (4) 일반 객체를 interface 로 타입 설정하기

interface Person {
  name: string;
  age?: number; // ?의 의미 : 설정을 해도 되고 안 해도 됨
}

interface Developer extends Person {
  // 아래 name과 age는 Person interface와 같기 때문에 extends로 상속받아 사용할 수 있다.
  // name: string;
  // age?: number;
  skills: string[];
}

const person: Person = {
  name: '월리월리',
  age: 27
};

const expert: Developer = {
  name: '심슨',
  skills: ['javascript', 'react', 'vuejs']
};

const people: Person[] = [person, expert];