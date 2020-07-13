// (6) Generics
// 제네릭은 타입스크립트에서 함수, 클래스, interface, type을 사용하게 될 때
// 여러 종류의 타입에 대해 호환을 맞춰야 하는 상황에서 사용하는 문법이다.

// (6-1) 함수에서 제네릭 사용
// ex) 객체 A와 객체 B를 합쳐주는 함수
// A와 B가 어떤 타입이 올지 모르므로 any 라는 타입을 쓸 수도 있다.
function beforeMerge(a: any, b: any): any {
  return {
    ...a,
    ...b
  };
}

const beforeMerged = beforeMerge({ 'a': 1 }, { 'b': 2 });

// 하지만 위와 같이 작성하면 타입 추론이 모두 깨진거나 다름 없다.
// any로 설정했기 때문에 어떤 타입이 들어왔는지 알 수가 없다.
// 이와 같은 상황에서 제네릭을 사용하면 된다.

// <> 안에 타입의 이름을 넣어 사용하며,
// 이렇게 설정하면 제네릭에 해당하는 타입에는 뭐든지 들어올 수 있게 되면서도,
// 사용할 때 타입이 깨지지 않게 된다.
function merge<A, B>(a: A, b: B): A & B {
  return {
    ...a,
    ...b
  };
}

const merged = merge({ 'a': 1 }, { 'b': 2 });

// 만약 함수에 이와 같이 제네릭을 사용하게 되면 함수의 파라미터로 넣은 실제 값의 타입을 활용하게 된다.
function wrap<T>(param: T) {
  return {
    param
  };
}

const wrapped = wrap(10);
console.log(wrapped)


// (6-2) interface에서 제네릭 사용
interface Items<T> {
  list: T[];
}

const items: Items<string> = {
  list: ['a', 'b', 'c']
}
console.log(items)

// Items<string> 라고 작성함으로써 Items 타입을 지니고 있는 객체의 list 배열은 string[] 타입을 지닌다는 것이다.
// 숫자배열로 넣고 싶은 경우 Items<number> 라고 작성하면 된다.


// (6-3) type alias에서 제네릭 사용
// interface에서 제네릭을 사용할 때와 매우 비슷하다.
type Fruits<T> = {
  list: T[];
}

const fruits: Fruits<string> = {
  list: ['apple', 'grape', 'watermelon']
}


// (6-4) 클래스에서 제네릭 사용
// 자료구조 중 큐(Queue)를 클래스로 구현해보자.
class Queue<T> {
  list: T[] = [];

  enqueue(item: T ) {
    this.list.push(item);
  }

  dequeue() {
    return this.list.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(6);
queue.enqueue(3);
queue.enqueue(8);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

const queue2 = new Queue<string>();
queue2.enqueue('a');
queue2.enqueue('b');
queue2.enqueue('c');
queue2.enqueue('d');
console.log(queue2.dequeue());
console.log(queue2.dequeue());
console.log(queue2.dequeue());
console.log(queue2.dequeue());