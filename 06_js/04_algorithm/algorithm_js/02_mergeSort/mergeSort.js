// 참고: https://www.youtube.com/watch?v=FCAtxryNgq4
let array = [70, 20, 50, 10, 30, 40];
let sortedArray = [];
let idx = 0;
while (idx < array.length) {
  sortedArray.push(0);
  idx += 1;
}

function mergeSort(left, right) {
  if (left < right) {
    // 중간 지점 찾기
    const mid = left + parseInt((right - left) / 2);

    // 분할(divide)
    mergeSort(left, mid); // 왼쪽 부분
    mergeSort(mid + 1, right); // 오른쪽 부분

    // 정복(conquer): 왼쪽과 오른쪽을 병합하여 정렬된 상태 만듬
    let i = left;
    let j = mid + 1;
    let k = left;
    while (i <= mid && j <= right) {
      if (array[i] < array[j]) {
        sortedArray[k] = array[i];
        k += 1;
        i += 1;
      } else {
        sortedArray[k] = array[j];
        k += 1;
        j += 1;
      }
    }
    while (i <= mid) {
      sortedArray[k] = array[i];
      k += 1;
      i += 1;
    }
    while (j <= right) {
      sortedArray[k] = array[j];
      k += 1;
      j += 1;
    }
    for (let i = left; i <= right; i++) {
      array[i] = sortedArray[i];
    }
  }
}

mergeSort(0, array.length - 1);
console.log(array);