function createCounterClosure() {
	let count = 0;
	return {
		increase: function() {
			count++;
		},
    getCount: function() {
      return count;
    }
	}
}

const counter1 = createCounterClosure();
const counter2 = createCounterClosure();

counter1.increase();
counter1.increase();
console.log('counter 1의 값 : ' + counter1.getCount());
counter2.increase();
console.log('counter 2의 값 : ' + counter2.getCount());