function checkNumber(val) {
  if (typeof val !== 'number') throw '유효하지 않은 값입니다.';
  console.log('숫자형 값으로 확인되었습니다.');
}

checkNumber(100);
checkNumber('Wrong type');
console.log('완료');