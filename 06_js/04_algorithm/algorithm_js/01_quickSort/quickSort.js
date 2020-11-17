// 참고: https://www.youtube.com/watch?v=cWH49IKDIiI
function partition(array, left, right) {
  let pivot = array[right];
  let i = left - 1;
  for (let j = left; j <= right - 1; j++) {
    if (array[j] <= pivot) {
      i++;
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  let temp = array[i + 1];
  array[i + 1] = array[right];
  array[right] = temp;
  return i + 1;
}

function quickSort(array, left, right) {
  if (left < right) {
    let pivot = partition(array, left, right);
    quickSort(array, left, pivot - 1);
    quickSort(array, pivot + 1, right);
  }
  return array
}

console.log(quickSort([70, 20, 50, 10, 30, 40], 0, 5));