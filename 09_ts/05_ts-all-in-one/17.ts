// infer
// 타입스크립트가 타입을 자동으로 추론하여준다.

function zip(x: number, y: string, z: boolean): { x: number, y: string, z: boolean } {
  return { x, y, z };
}

// zip 함수의 매개변수의 타입들을 가져오고 싶을 때
type Params = Parameters<typeof zip>;
type First = Params[0]; // number

// 제네릭으로 올 수 있는 건 함수형태로만 올 수 있어 extends (...args: any) => any로 제한을 둔다.
// infer는 extends에서만 사용할 수 있다.
// 추론 조건 ? 추론 성공 시의 값 : 추론 실패 시의 값
type CustomParameters<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A: never;
type CustomReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A: never;

type Ret = CustomReturnType<typeof zip>;
type Ret2 = ReturnType<typeof zip>;


type CustomConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
type CustomInstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

class UserInfo {
  name: string;
  age: number

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const wallyUserInfo = new UserInfo('wally', 30);
// 클래스의 생성자 타입 얻을 때
type Cons = ConstructorParameters<typeof UserInfo>; // typeof 클래스가 생성자
// 클래스의 인스턴스 타입 얻을 때
type Inst = InstanceType<typeof UserInfo>;

// 클래스는 타입으로 그대로 바로 쓸 수 있다.
const u: UserInfo = new UserInfo('aaa', 20); // 정확히는 클래스가 아니라 인스턴스(new 붙여서 객체 만들어낸거)이다.

// const text = 'Hello World';
// const LowerText: Lowercase<typeof text> = text.toLowerCase();
// intrinsic -> 타입스크립트 코드로는 직접 구현이 안 되서 따로 어딘가에 구현되어 있다는 의미
// ThisType도 lib.es5.d.ts 보면 비워져 있어서 위와 같이 타입으로는 구현하기 어렵고 코드 구현부는 다른 곳에 있다는 의미가 된다.