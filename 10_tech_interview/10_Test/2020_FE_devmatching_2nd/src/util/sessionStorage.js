// sessionStorage에서 데이터 추출
export function getItem(key) {
  return sessionStorage.getItem(key);
}

// sessionStorage에 데이터 저장
export function setItem(key, value) {
  sessionStorage.setItem(key, value);
}