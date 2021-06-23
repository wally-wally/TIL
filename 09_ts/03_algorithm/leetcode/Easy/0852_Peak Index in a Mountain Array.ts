const peakIndexInMountainArray = (arr: number[]): number => {
  let peakIndex = 0;

  while (peakIndex < arr.length) {
    if (arr[peakIndex] > arr[peakIndex + 1]) {
      return peakIndex;
    }

    peakIndex += 1;
  }
};

console.log(peakIndexInMountainArray([0, 1, 0])); // 1
console.log(peakIndexInMountainArray([0, 2, 1, 0])); // 1
console.log(peakIndexInMountainArray([0, 10, 5, 2])); // 1
console.log(peakIndexInMountainArray([3, 4, 5, 1])); // 2
console.log(peakIndexInMountainArray([24, 69, 100, 99, 79, 78, 67, 36, 26, 19])); // 2