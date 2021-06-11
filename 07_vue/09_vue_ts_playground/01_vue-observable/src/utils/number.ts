const number = {
  validNumber(value: number, min: number, max: number): boolean {
    if (value < min || value > max) {
      alert(`숫자 범위 : ${min} 이상 ${max} 이하의 정수`);
      return false;
    }

    return true;
  },
};

export { number };
