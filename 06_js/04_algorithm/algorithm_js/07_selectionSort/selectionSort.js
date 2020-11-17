// Selection sort
// 가장 작은 숫자를 차례대로 탐색, 가장 왼쪽 자리부터 swap
// 제일 작은 숫자를 찾기 위해 순차적으로 이동
// 가장 작은 숫자를 선택하는 방식으로 정렬을 진행하여 선택정렬 이라 부름
// outer 루프가 한 번 돌때마다 하나의 원소 최종위치가 확정
// 탐색범위
// outer: 0 => n - 1 (첫 번째 원소를 가장 낮은 숫자로 가정하고 시작)
// inner: 0 => i + 1 (이미 정렬 되어있는 부분 제외, 가장 낮은 숫자 다음 인덱스부터 비교하며 swap)
// Time Complexity
// Worst: O(n^2) / Average: O(n^2) / Best: O(n^2)

function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) { // outer 루프
    let min = i;
    for (let j = i + 1; j < n; j++) { // inner 루프
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    let tempValue = arr[min];
    arr[min] = arr[i];
    arr[i] = tempValue;
  }
  return arr;
}

console.log(selectionSort([7, 11, 3, 9, 5, 6]));