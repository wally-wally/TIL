// (5) type alias
// type : 특정 타입에 별칭을 붙이는 용도로 사용한다.
// 객체를 위한 타입을 설정할 수도 있고 배열 또는 그 어떤 타입이든 별칭을 지어줄 수 있다.

type Product = {
  name: string;
  price: number;
  code?: number;
};

// &의 의미 : Intersection 으로서 두 개 이상의 타입들을 합쳐준다.
type Book = Product & {
  genre: string[];
  isbn: number;
}

const product: Product = {
  name: 'TV',
  price: 1000000
}

const book: Book = {
  name: '소설책',
  price: 15000,
  genre: ['현대소설', '한국소설'],
  isbn: 978123456
}

type Products = Product[]; // 이와 같이 작성하면 Product[] 를 앞으로 Products 라는 타입으로 사용할 수 있다.
const products: Products = [product, book];

type CableColor = 'red' | 'yellow' | 'green';
const cableColor: CableColor = 'red';
// const cableColor2: CableColor = 'blue'; // 'blue'가 있으므로 에러
const cableColors: CableColor[] = ['red', 'yellow'];
// const cableColors2: CableColor[] = ['red', 'yellow', 'blue']; // 'blue'가 있으므로 에러