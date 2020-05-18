// interface는 실제로 쓰이지 않지만 class의 모양을 잡을 때 class에서 implements를 사용해서 작성한다.
interface ICard { // 대문자 I로 시작하는 것이 interface naming convention
  // interface가 class보다 더 넓은 집합이다.
  att?: number;
  hp?: number;
  // 또한 implements는 class 내에서 protected와 private로 선언된 경우 사용할 수 없다.
  // 즉, public으로 되는 경우에는 강제로 interface를 사용해서 작성할 수 있다.
}

class Card implements ICard { // implements(class Card implements ICard) : class의 모양을 interface로 잡을 때 사용
  // 처음엔 private으로 설정하고 점차 범위를 넓히면서 적용하자
  // public att: number; // public: 아무 곳에서나 접근 가능
  public att?: number; // public: 아무 곳에서나 접근 가능
  public hp?: number; // protected: public 보다는 약하고 private 보다는 쎔
  private cost?: number; // private: 접근 불가 변수로 지정 가능
  private mine?: boolean;
  constructor(hero: boolean, mine: boolean) {
    if (hero) {
      return new Hero(mine);
    } else {
      this.att = Math.ceil(Math.random() * 5);
      this.hp = Math.ceil(Math.random() * 5);
      this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (mine) {
      this.mine = true;
    }
  }
}

// [정리!] public, protected, private
// public : 내 class, instance, 상속받는 자식 모두 사용 가능
// protected : 내 class와 나를 상속받는 자식한테 사용 가능(식구들한테만 공개)
// private : class 내에서만 접근 가능

new Card(true, false);

class Hero extends Card {
  private hero: boolean;
  private field: boolean;
  constructor(mine: boolean) {
    super(true, mine);
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
    this.field = true;
  }
}


const card = new Card(true, true);
// card.cost // 접근 불가능
const card2 = new Card(true, true);
const card3 = new Card(true, true);

// javascript에서 class 정의하는 방법
// class Card {
//   constructor(hero, mine) {
//     if (hero) {
//       this.att = Math.ceil(Math.random() * 2);
//       this.hp = Math.ceil(Math.random() * 5) + 25;
//       this.hero = true;
//       this.field = true;
//     } else {
//       this.att = Math.ceil(Math.random() * 5);
//       this.hp = Math.ceil(Math.random() * 5);
//       this.cost = Math.floor((this.att + this.hp)  2);
//     }
//     if (mine) {
//       this.mine = true;
//     }
//   }
// }
// new Card(true, true);
// new Card(true, true);

// interface Card {
//   att: number;
//   hp: number;
//   cost: number;
// }

// 인터페이스도 아래와 같이 클래스 표현이 가능하다.
// interface Card {
//   new (mine: boolean);
// }

// 빈 값을 의도적으로 넣었음을 알리기 위해 null을 쓴다.
// ?와 null은 별도로 친다. / ?는 '| undefined'로 인식
interface Player {
  hero: HTMLDivElement
  deck: HTMLDivElement
  field: HTMLDivElement
  cost: HTMLDivElement
  deckData: Card[]
  heroData?: Card | null
  fieldData: Card[]
  chosenCard?: HTMLDivElement | null
  chosenCardData?: Card | null
}

const opponent: Player = {
  hero: document.getElementById('rival-hero') as HTMLDivElement,
  deck: document.getElementById('rival-deck') as HTMLDivElement,
  field: document.getElementById('rival-cards') as HTMLDivElement,
  cost: document.getElementById('rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null
};

const me: Player = {
  hero: document.getElementById('my-hero') as HTMLDivElement,
  deck: document.getElementById('my-deck') as HTMLDivElement,
  field: document.getElementById('my-cards') as HTMLDivElement,
  cost: document.getElementById('my-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null
};