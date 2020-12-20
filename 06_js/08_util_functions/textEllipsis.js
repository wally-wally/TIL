// CSS를 이용해서 말줄임표를 구현할 수 있지만
// JS를 이용해서 구체적으로 몇 글자 이상일 때 말줄임표를 적용하고 싶은 경우
// 아래 함수를 사용하면 된다.

export const textEllipsis = (text, maxRange) => {
  return text.length <= maxRange ? text : `${text.slice(0, maxRange - 1)}...`;
};

console.log(textEllipsis('abcdefg', 5)); // 'abcde...'
console.log(textEllipsis('abcdefg', 10)); // 'abcdefg'