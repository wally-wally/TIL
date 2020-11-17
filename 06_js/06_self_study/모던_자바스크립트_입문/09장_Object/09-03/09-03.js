// 접근자 프로퍼티
let person = {
  _name: 'wally-wally',
  get name() {
    return this._name;
  },
  set name(value) {
    let str = value.charAt(0).toUpperCase() + value.substring(1);
    this._name = str;
  }
};

console.log(person.name); // wally-wally
person.name = 'wally';
console.log(person.name); // Wally


// 데이터의 캡슐화
let encapsulatedPerson = (function() {
  let _name = 'wally-wally';
  return {
    get name() {
      return _name;
    },
    set name(value) {
      let str = value.charAt(0).toUpperCase() + value.substring(1);
      _name = str;
    }
  };
})();

console.log(encapsulatedPerson.name); // wally-wally
encapsulatedPerson.name = 'wally';
console.log(encapsulatedPerson.name); // Wally