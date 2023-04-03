// before
// let counter = 0;
// function incrementCounter() {
//   counter++;
// }

// function main() {
//   for (let i = 0; i < 20; i++) {
//     incrementCounter();
//     console.log(counter);
//   }
// }

// after
class Counter {
  private counter = 0;
  getCounter() {
    return this.counter;
  }

  setCounter(c: number) {
    this.counter = c;
  }
}

function incrementCounter(counter: Counter) {
  counter.setCounter(counter.getCounter() + 1);
}

let counter = new Counter();
function main() {
  for (let i = 0; i < 20; i++) {
    incrementCounter(counter);
    console.log(counter.getCounter());
  }
}