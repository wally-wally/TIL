enum FizzBuzz {
  Fizz = 3,
  Buzz = 5,
  FizzBuzz = 15,
};

const fizzBuzz = (n: number): string[] => {
  const setFizzBuzz = (num: number) => {
    if (num % FizzBuzz.FizzBuzz === 0) {
      return 'FizzBuzz';
    }

    if (num % FizzBuzz.Fizz === 0) {
      return 'Fizz';
    }

    if (num % FizzBuzz.Buzz === 0) {
      return 'Buzz';
    }

    return String(num);
  }

  return Array(n).fill(0).map((_, index) => setFizzBuzz(index + 1));
};

console.log(fizzBuzz(3)); // ["1","2","Fizz"]
console.log(fizzBuzz(5)); // ["1","2","Fizz","4","Buzz"]
console.log(fizzBuzz(15)); // ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]