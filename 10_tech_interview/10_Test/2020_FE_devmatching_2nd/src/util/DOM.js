export const DOM = {
  addClass: (target, className) => {
    target.classList.add(className);
  },
  removeClass: (target, className) => {
    target.classList.remove(className);
  },
  setDisplay: (target, value) => {
    target.style.display = value;
  },
  movePage: (url) => {
    window.open(url, '_self');
  }
}