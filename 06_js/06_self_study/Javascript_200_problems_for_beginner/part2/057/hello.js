export default class Hello {
  constructor(greeting) {
    this.greeting = greeting;
  }
  hi(name) {
    console.log(`${this.greeting} ${name}`);
  }
}