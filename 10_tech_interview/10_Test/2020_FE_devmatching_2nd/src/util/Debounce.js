export const Debounce = (func, wait) => {
  let timeOut;
  return function executedFunction(...args) {
    const later = () => {
      timeOut = null;
      func(...args);
    };
    clearTimeout(timeOut);
    timeOut = setTimeout(later, wait);
  }
}