interface Hero {
  name: string;
  skill: string;
}

// const capt: Hero = {
//   name: 'hi',
//   skill: 'shield',
// };

// const capt: Hero = {};

const capt = {} as Hero;
// as 키워드를 이용한 타입 단언을 사용하면 아래 두 줄은 굳이 안 써도 오류가 나지 않는다.
// 그래서 초기값을 지정하지 않아서 생기는 오류를 겪을 수도 있으니 주의하자.
// capt.name = 'capt';
// capt.skill = 'shield';

const a: string | null;
// 아래와 같이 !를 쓸 수 있지만 예상하지 못한 null 값들이 넘어올 수 있기 때문에 주의 문구가 표시된다.
a!; // non-null-type-assertion
