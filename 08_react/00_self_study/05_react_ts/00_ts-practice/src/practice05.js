// (5) type alias
// type : 특정 타입에 별칭을 붙이는 용도로 사용한다.
// 객체를 위한 타입을 설정할 수도 있고 배열 또는 그 어떤 타입이든 별칭을 지어줄 수 있다.
var product = {
    name: 'TV',
    price: 1000000
};
var book = {
    name: '소설책',
    price: 15000,
    genre: ['현대소설', '한국소설'],
    isbn: 978123456
};
var products = [product, book];
var cableColor = 'red';
// const cableColor2: CableColor = 'blue'; // 'blue'가 있으므로 에러
var cableColors = ['red', 'yellow'];
// const cableColors2: CableColor[] = ['red', 'yellow', 'blue']; // 'blue'가 있으므로 에러
