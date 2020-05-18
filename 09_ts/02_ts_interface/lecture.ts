let imgCoords: RSP[keyof RSP] = '0'; // 기본적으로 'string'으로 넓게 잡혀 있으므로 : RSP[keyof RSP]를 작성함으로써 타입 범위를 좁혀준다.

// interface : 보통 아래와 같이 type으로 선언해서 넓게 쓸 수 있게 interface를 만든다.
// interface RSP {
//   ROCK: string
//   SCISSORS: string
//   PAPER: string
// }

// interface는 줄바꿈만해도 구분된다.
// interface RSP { 
//   readonly ROCK: '0'
// }
// 아래 as const를 붙였을 때와 같은 효과를 가지려면 interface에서 각 key-value 앞에 readonly를 붙여준다.

// 이와 같이 같은 이름의 interface를 나눠서 작성하면 하나의 interface로 합쳐져서 인식하게 된다. 그래서 남의 interface를 가져와서 사용할 때 필요에 따라 추가해서 확장 사용할 수 있다.
// interface RSP {
//   readonly SCISSORS: '-142px'
//   readonly PAPER: '-284px'
// }

interface Example {
  a: 3,
  b: 7,
  [s: string]: number // 이 자리에 무엇이 들어올 지 모를 때 이와 같이 넓은 범위로 작성해서 여유를 줄 수 있지만 가급적이면 이렇게는 작성하지 말자(typescript의 엄격한 type 설정 특징을 유지하기 위해)
}

// interface Example extends RSP { // interface를 상속받아서 확장 사용할 때는 extends를 사용한다.
// 
// }

const example: Example = {
  a: 3,
  b: 7,
  d: 200
}
  
interface RSP {
  ROCK: '0';
  SCISSORS: '-142px';
  PAPER: '-284px';
}

const rsp: RSP = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px',
};

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;


// type의 경우 interface 처럼 같은 이름의 type을 나눠서 작성하지 못한다.
// type RSP = {
//   readonly ROCK: '0'
// }

// type RSP = {
//   readonly SCISSORS: '-142px'
//   readonly PAPER: '-284px'
// }

// type과 interface는 유사하나 type이 좀 더 넓은 범위이고, interface는 주로 객체의 인터페이스를 정의할 때 사용하고
// type은 custom type을 만들 수 있다는 특징이 있다.(type aliases)
type Hello = string | number;
// type은 좀 더 다재다능하게 쓸 수 있다.
type sayHello = {
  ROCK: string;
  PAPER: string;
} | string;

const hi: sayHello = {
  ROCK: 'a',
  PAPER: 'b'
};
// 하지만 객체로 선언해서 사용할 때는 interface를 이용해서 작성하도록 하자!
// type은 보통 union으로 작성한다. // type Hello = string | number;

// 'ROCK' | 'SCISSORS' | 'PAPER'를 keyof RSP로 줄여서 쓸 수 있다.
// imgCoords: '0' | '-142px' | '-284px'를 imgCoords: RSP[keyof RSP]로 줄여서 작성할 수 있다.
function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP { // RSP[keyof RSP] 대신에 string을 써도 인식됨(좁은 범위 => 넓은 범위 개념) 하지만 가급적이면 서로 같은 형태로 맞춰주자!
  // ! : d.ts에 .find와 관련해서 해당 값이 없으면 undefined라고 나오게 이미 설정되어 있는데 개발자가 강제로 무조건 해당 값이 있다고 선언해줌으로써 undefined 출력을 막을 수 있다.
  // !를 붙여줌으로써 null이 되는 경우 개발자가 확실히 보장해준다는 의미
  // keys를 string[]라고 한계를 지었기 때문에 as를 사용해 우리 프로젝트에 맞게 형변환을 해준다.
  return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords)!;
}

let interval: number;
let point: number = 0;
document.querySelectorAll('.btn').forEach((btn) => { // 여기서 화살표는 화살표 함수가 아니다!
  btn.addEventListener('click', function(this: HTMLButtonElement, e: Event) { // 함수에서 this 사용시 첫 번째 인수로 this: HTMLButtonElement를 반드시 작성해야 한다!
    clearInterval(interval);
    setTimeout(intervalMaker, 2000);
    const myChoice = this.textContent as keyof RSP; // as keyof RSP를 직접 적어줌으로써 범위를 좁혀서 type을 명확히 명시해준다.
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    const diff = myScore - computerScore;
    if (diff === 0) {
      console.log('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      console.log('이겼습니다!');
      point++;
    } else {
      console.log('졌습니다.');
      point--;
    }
    // as HTMLDivElement를 작성함으로써 .querySelector의 null 상태를 없애줄 수 있다.
    (document.querySelector('#point') as HTMLDivElement).textContent = String(point); // .textContent는 String | null이고 point는 Number이므로 String(point)로 String 형변환을 해준다.
  })
});


function intervalMaker() {
  interval = setInterval(function () {
    if (imgCoords === rsp.ROCK) {
      imgCoords = rsp.SCISSORS;
    } else if (imgCoords === rsp.SCISSORS) {
      imgCoords = rsp.PAPER;
    } else {
      imgCoords = rsp.ROCK;
    }
    if (document.querySelector('#computer')) { // d.ts에 .querySelector가 null일 수도 있는 가능성이 있다고 작성되어 있으므로 ! 대신에 if문으로 조건을 걸어준다.
      // .querySelector가 Element이므로 HTMLDivElement로 좁은 범위의 type으로 형변환해서 style에 접근할 수 있도록 해줘야 오류가 생기지 않는다.
      (document.querySelector('#computer') as HTMLDivElement).style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgCoords + ' 0';
    }
    // 또는 제네릭을 사용할 경우 아래와 같이 작성할 수 있다.
    // 하나의 변수로 만들어줘야 if문 안의 조건식과 조건 만족시 실행문에서 동일한 값으로 인식할 수 있다.(typescript의 단점...)
    // const computer = document.querySelector<HTMLDivElement>('#computer');
    // if (computer) {
    //   computer.style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgCoords + ' 0';
    // }
    // if (document.querySelector<HTMLDivElement>('#computer')) { // 아직까지 typescript는 여기의 '#computer'와 아래 실행문의 '#computer'가 같다는 것을 인식하지 못한다...
    //   document.querySelector<HTMLDivElement>('#computer').style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgCoords + ' 0';
    // }
  }, 100);
}

intervalMaker();