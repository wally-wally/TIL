// Insertion sort
// 단순한 정렬 시리즈 중 하나
// 정렬된 어레이를 유지하며 진행
// 새로운 숫자가 삽입되면 정렬된 어레이 안에서 자기의 자리를 찾아가며 정렬
// 정렬된 partial array를 유지하며 한 칸씩 늘려가며 정렬
// 한 칸 늘릴 때 새로 삽입된 데이터를 정렬된 array에서 맞는 자리로 위치시킴
// 탐색범위
// outer: 1 => n (정렬된 array를 유지할 대 시작 사이즈를 2로 설정)
// inner: j >= 0 && arr[j] > key
// (정렬된 array를 끝까지 탐색을 안함 and 현재 값 보다 키가 더 작을 때 => 왼쪽으로 이동)
// Time Complexity
// Worst: O(n^2) / Average: O(n^2) / Best: O(n^2)

function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

console.log(insertionSort([7, 11, 3, 9, 5, 6]));