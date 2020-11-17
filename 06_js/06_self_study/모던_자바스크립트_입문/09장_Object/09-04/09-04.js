// Object.getOwnPropertyDescriptor
let user = { id: 1, name: 'Sam' };
// {value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(user, 'id'));
// {value: "Sam", writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(user, 'name'));
console.log(Object.getOwnPropertyDescriptor({}, 'name')); // undefined
console.log(Object.getOwnPropertyDescriptor(user, 'toString')); // undefined


// Object.defineProperty
let obj = {};
Object.defineProperty(obj, 'id', {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true
});
Object.defineProperty(obj, 'name', {
  value: 'Macbook',
  writable: false,
  enumerable: true,
  configurable: false
});
console.log(obj);
obj.name = 'Macbook2';
console.log(obj); // name 속성의 writable 속성을 false로 정의했기 때문에 name 속성에 새로운 값을 할당해도 변하지 않는다.

for (const p in obj) {
  console.log(p);
}

// enumerable이 false이므로 delete 연산자 동작은 무시된다.
delete obj.name;
console.log(obj.name); // Macbook
// 또한 프로퍼티의 속성 값들을 마음대로 바꿀 수 없다.
// Object.defineProperty(obj, 'name', {writable: true}); // Uncaught TypeError: Cannot redefine property: name


// Object.defineProperties
let newObj = Object.defineProperties({}, {
  id: {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
  },
  name: {
    value: 'Macbook',
    writable: false,
    enumerable: true,
    configurable: false
  }
});

console.log(newObj); // {name: "Macbook", id: 1}
// {value: 1, writable: true, enumerable: false, configurable: true}
console.log(Object.getOwnPropertyDescriptor(newObj, 'id'));
// {value: "Macbook", writable: false, enumerable: true, configurable: false}
console.log(Object.getOwnPropertyDescriptor(newObj, 'name'));


// Object.create의 두 번째 인자
const product1 = {
  category: 'Clothes',
  name: 'Item A',
  description: function() {
    console.log(`This is ${this.name}(${this.category}).`);
  }
};
const product2 = Object.create(product1, {
  seller: {
    value: 'wally-wally',
    writable: false,
    enumerable: true,
    configurable: true
  },
  discountRate: {
    value: '10%',
    writable: false,
    enumerable: true,
    configurable: false
  }
})

product2.category = 'Food';
product2.name = 'Item B';
product2.description(); // This is Item B(Food).
console.log(product2.seller); // wally-wally
console.log(product2.discountRate); // 10%