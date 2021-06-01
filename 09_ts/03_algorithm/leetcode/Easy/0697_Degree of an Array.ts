interface IndexInfo {
  count: number;
  minIndex: number;
  maxIndex: number;
}

type NumberIndexMap = Map<number, IndexInfo>;

const findShortestSubArray = (nums: number[]): number => {
  const numberIndexMap = nums.reduce((indexMap: NumberIndexMap, currentNumber: number, index: number) => {
    if (indexMap.has(currentNumber)) {
      const indexInfo = indexMap.get(currentNumber);
      indexMap.set(currentNumber, {
        ...indexInfo,
        count: indexInfo.count + 1,
        maxIndex: index,
      });
    } else {
      indexMap.set(currentNumber, {
        count: 1,
        minIndex: index,
        maxIndex: index,
      });
    }

    return indexMap;
  }, new Map() as NumberIndexMap);

  const sortedNumberIndexInfo = [...numberIndexMap.entries()].sort((a, b) => b[1].count - a[1].count);

  const maxCount = sortedNumberIndexInfo[0][1].count;

  const filteredMaxCountNumberInfos = sortedNumberIndexInfo.filter((numberInfo) => numberInfo[1].count === maxCount);

  return filteredMaxCountNumberInfos.reduce((result, [_, { minIndex, maxIndex }]) => {
    const subArrayLength = maxIndex - minIndex + 1;

    return result >= subArrayLength ? subArrayLength : result;
  }, Number.MAX_SAFE_INTEGER);
};

console.log(findShortestSubArray([1, 2, 2, 3, 1])); // 2
console.log(findShortestSubArray([1, 2, 2, 3, 1, 4, 2])); // 6