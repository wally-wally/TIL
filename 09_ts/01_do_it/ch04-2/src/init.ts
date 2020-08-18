// (1) 콜백 함수: 매개변수 형태로 동작하는 함수
// const f = (callback: () => void): void => callback()
export const init = (callback: () => void): void => {
  console.log('default initialization finished.')
  callback()
  console.log('all initialization finished.')
}