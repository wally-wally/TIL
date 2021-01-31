const solution = (newId) => {
  let answer = '';

  // 1 ~ 3단계
  answer = newId.toLowerCase().replace(/[^a-z|\d|\-_.]/g, '').replace(/\.{2,}/g, '.');

  // 4 ~ 5단계
  let startSliceIdx = 0;
  let endSliceIdx = answer.length;
  if (answer[0] === '.') {
    startSliceIdx += 1;
  }
  if (answer[answer.length - 1] === '.') {
    endSliceIdx -= 1;
  }
  answer = answer.slice(startSliceIdx, endSliceIdx).replace(/^$/, 'a');

  // 6단계
  if (answer.length >= 16) {
    answer = answer.slice(0, 15).replace(/\.+$/, '');
  }

  // 7단계
  const lastCharacter = answer[answer.length - 1];
  answer = answer.padEnd(3, lastCharacter);

  return answer;
};

solution('..!@BaT#*..y.abcdefgi.jklm.');
solution('z-+.^.');
solution('=.=');
solution('123_.def');
solution('abcdefghijklmn.p');
