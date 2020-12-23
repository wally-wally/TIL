export const converFileSize = (fileSize, round = 0) => {
  // 계산하기 전 '0[Byte]'로 출력되는 경우
  // (1) size parameter가 null이나 undefined인 경우 
  if (fileSize === null || fileSize === undefined) {
    return '0[Byte]';
  }
  // (2) parseFloat으로 type 변환 했음에도 불구하고 숫자 형태가 아닌 경우 '0[Byte]' 로 고정
  const size = parseFloat(fileSize);
  if (isNaN(size)) {
    return '0[Byte]';
  }
  // (3) 파일 용량이 음수인 경우는 없으므로 음수 숫자가 넘어오면 '0[Byte]'로 고정
  if (size < 0) {
    return '0[Byte]';
  }

  // 반올림 자리수 결정
  // round parameter가 숫자 형태이면서 1 이상인 경우에 입력된 parameter 사용
  // 그 외의 경우는 0으로 고정
  let roundDigit = 0;
  const numberizeRound = parseInt(round);
  if (!isNaN(numberizeRound) && numberizeRound >= 1) {
    roundDigit = numberizeRound;
  }

  // 실제 용량 변환 계산 로직
  const units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let squareNumber = 0;
  while (squareNumber < 5) {
    if ((squareNumber === 0 ? 0 : Math.pow(1024, squareNumber)) <= size && size < Math.pow(1024, squareNumber + 1)) {
      break;
    }
    squareNumber += 1;
  }
  return `${(size / Math.pow(1024, squareNumber)).toFixed(roundDigit)}[${units[squareNumber]}]`;
}