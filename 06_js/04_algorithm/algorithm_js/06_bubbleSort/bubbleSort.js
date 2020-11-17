// bubble sort
// 두 숫자를 비교한 후 큰 숫자를 오른쪽으로 이동
// outer 루프가 한 번 돌때마다 하나의 원소의 최종위치가 확정
// 탐색범위
// outer: 0 => n - 1(마지막 원소는 이미 비교 되었음)
// inner: 0 => n - i - 1(이미 정렬 되어 있는 부분은 제외)
// Time Complexity
// Worst: O(n^2) / Average: O(n^2) / Best: O(n)

function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) { // outer 루프
    for (let j = 0; j < n - i - 1; j++) { // inner 루프
      if (arr[j] > arr[j + 1]) {
        let tempValue = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tempValue;
      }
    }
  }
  return arr;
}

console.log(bubbleSort([7, 11, 3, 9, 5, 6]));