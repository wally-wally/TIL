// utility type

interface Profile {
  name: string;
  age: number;
  married: boolean;
}

// (1) Partial
type CustomPartial<T> = {
  [k in keyof T]?: T[k];
}

// (2) Pick
// 제네릭이 있다면 제니릭들의 제한 조건을 먼저 확인해보자.
type CustomPick<T, S extends keyof T> = {
  [k in S]: T[k];
}

// (3) Omit
// 대신 'S extends keyof any'와 같이 두 번째 제네릭 제한 조건으로 key 값으로 올 수 있는 symbol 형태만 오도록 제한할 수 있다.(key로 올 수 있는 조건마저 엄격하게 제한검)
// S extends keyof any -> string | number | symbol
type CustomOmit<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>;

// (4) Exclude
// T extends U -> T가 U의 부분집합인가
type CustomExclude<T, U> = T extends U ? never : T;

// (5) Extract
type CustomExtract<T, U> = T extends U ? T : never;

// (6) Required
// -?(mapped type modifier) => '?'(옵셔널)을 모두 제거하라는 의미
// https://mariusschulz.com/blog/mapped-type-modifiers-in-typescript#removing-the-mapped-type-modifier
type CustomRequired<T> = {
  [k in keyof T]-?: T[k];
}

// (7) Readonly
// 수정 불가 상태로 만듬
type CustomReadonly<T> = {
  readonly [k in keyof T]: T[k];
};
// 참고로 남이 지정한 타입이 readonly일 때 제거하고 싶으면 -readonly [k in keyof T]: T[k]; 처럼 쓸 수도 있다. (물론 -?랑도 조합 가능)

// (8) Record
// 객체를 표현하는 방법
type CustomRecord<T extends keyof any, S> = {
  [k in T]: S;
}

// (9)
type XYZ = string | null | undefined | boolean | number;
type CustomNonNullable<T> = T extends null | undefined ? never : T;
// 제네릭으로 key들을 넘겨서 하나씩 검사하면서 extends 뒤에 있는거랑 연관있는지 검사한다.
type PPP = CustomNonNullable<XYZ>; // string | boolean | number
// 하지만 최근 NonNullable type이 type NonNullable<T> = T & {}와 같이 내부적으로 로직이 바뀌었다.
// 06.ts에서 살펴본 것 처럼 {} 타입은 null과 undefined를 제외한 모든 타입이기 때문에 위와 같은 형태로 바뀐 것 같다.

const wallyInfo: Profile = {
  name: 'wally',
  age: 30,
  married: false,
};

// Partial<Profie>
// Pick<Profile, 'name' | 'age'>
// Omit<Profile, 'married'>
const newWallyInfo: CustomPartial<Profile> = {
  name: 'wally',
  age: 30,
};

type AnimalType = 'Cat' | 'Dog' | 'Human';
type Mammal = Exclude<AnimalType, 'Human'>; // 'Cat' | 'Dog'
type HumanType = Extract<AnimalType, 'Human'>;
type CatDog = Extract<AnimalType, 'Cat' | 'Dog'>;

type Info = Exclude<keyof Profile, 'married'>;

// Pick<Profile, 'name' | 'age'> === Pick<Profile, Exclude<keyof Profile, 'married'>> === Omit<Profile, 'married'>