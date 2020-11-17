function Teacher(name, age, subject) {
  this.name = name;
  this.age = age;
  this.subject = subject;
  this.teach = function (student) {
    console.log(student + '에게 ' + this.subject + '를 가르칩니다.');
  };
}

const jay = new Teacher('jay', 30, 'JavaScript');
console.log(jay);
jay.teach('bbo');

console.log(jay.constructor);
console.log(jay instanceof Teacher);

const jay2 = Teacher('jay', 30, 'JavaScript');
console.log(jay2);
console.log(age);