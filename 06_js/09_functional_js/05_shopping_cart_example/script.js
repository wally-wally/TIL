const products = [
  { name: 'Product1', price: 14000, quantity: 1, isSelected: true },
  { name: 'Product2', price: 30000, quantity: 2, isSelected: false },
  { name: 'Product3', price: 20000, quantity: 3, isSelected: true },
  { name: 'Product4', price: 25000, quantity: 4, isSelected: false },
  { name: 'Product5', price: 18000, quantity: 5, isSelected: false }
];

const add = (a, b) => a + b;

// (1) 총 수량
// const totalQuantity = products => go(products,
//   map(p => p.quantity),
//   reduce((a, b) => a + b));

const totalQuantity = pipe( // go 대신에 pipe로도 가능
  map(p => p.quantity),
  reduce(add));

log(totalQuantity(products));


// (2) 전체 합산 금액
const totalPrice = pipe( // go 대신에 pipe로도 가능
  map(p => p.price * p.quantity),
  reduce(add));

log(totalPrice(products));


// 추상화 레벨을 높여서 간결하게 작성
const sum = curry((f, iter) => go(
  iter,
  map(f),
  reduce(add)));

// const total_quantity = products => sum(p => p.quantity)(products);
const total_quantity = sum(p => p.quantity);

log(total_quantity(products));

// const total_price = products => sum(p => p.price * p.quantity)(products);
const total_price = sum(p => p.price * p.quantity);
  
log(total_price(products));

// 추상화를 높여서 작성하면 아래와 같이 다양한 형태의 데이터를 가지고 원하는대로 출력 가능
// log(sum(u => u.age, [
//   { age: 30 },
//   { age: 20 },
//   { age: 10 }
// ]));


// (3) HTML로 출력하기
// document.querySelector('#cart').innerHTML = `
//   <table>
//     <tr>
//       <th></th>
//       <th>상품 이름</th>
//       <th>가격</th>
//       <th>수량</th>
//       <th>총 가격</th>
//     </tr>
//     ${go(products,
//       map(p => `
//         <tr>
//           <td><input type="checkbox" ${p.isSelected ? 'checked' : ''}></td>
//           <td>${p.name}</td>
//           <td>${p.price}</td>
//           <td><input type="number" value="${p.quantity}"></td>
//           <td>${p.price * p.quantity}</td>
//         </tr>
//       `),
//       reduce(add) // reduce(add)로 배열안에 담겨 있던 텍스트를 하나의 텍스트 데이터로 더해서 바꿔준다.
//     )}
//     <tr>
//       <td colspan="2">합계</td>
//       <td>${total_quantity(products)}</td>
//       <td>${total_price(products)}</td>
//     </tr>
//   </table>
// `;

// curry가 적용된 sum 함수를 이용해서 더 간결하게 작성할 수 있다.
// 위 코드가 sum 함수의 구조와 유사하기 때문에 sum 함수로 바꿔서 아래와 같이 작성할 수 있다.
document.querySelector('#cart').innerHTML = `
  <table>
    <tr>
      <th></th>
      <th>상품 이름</th>
      <th>가격</th>
      <th>수량</th>
      <th>총 가격</th>
    </tr>
    ${go(products,
      sum(p => `
        <tr>
          <td><input type="checkbox" ${p.isSelected ? 'checked' : ''}></td>
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td><input type="number" value="${p.quantity}"></td>
          <td>${p.price * p.quantity}</td>
        </tr>
      `))}
    <tr>
      <td colspan="3">선택된 상품의 합계</td>
      <td>${total_quantity(filter(p => p.isSelected, products))}</td>
      <td>${total_price(filter(p => p.isSelected, products))}</td>
    </tr>
  </table>
`;
// 이와 같이 함수형 프로그래밍은 다형성이 아주 높다.
// 어떤 함수가 HTML을 만들기도 하고 가격과 수량을 곱한 값을 더하기도 하고 다양하게 활용될 수 있다.