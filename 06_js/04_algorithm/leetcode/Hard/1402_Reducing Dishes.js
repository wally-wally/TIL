const maxSatisfaction = (satisfaction) => {
  const satisfactionCount = satisfaction.length;
  const sortedSatisfactions = satisfaction.sort((a, b) => a - b);
  
  let maxResult = sortedSatisfactions[0];
  
  for (let i = 0; i < satisfactionCount; i++) {
    let tempSatisfaction = 0;
    
    for (let j = i; j < satisfactionCount; j++) {
      const positionIdx = j - i + 1;
      tempSatisfaction += sortedSatisfactions[j] * positionIdx;
    }
    
    if (tempSatisfaction > maxResult) {
      maxResult = tempSatisfaction;
    }
  }
  
  return maxResult > 0 ? maxResult : 0;
};

console.log(maxSatisfaction([-1, -8, 0, 5, -9])); // 14
console.log(maxSatisfaction([4, 3, 2])); // 20
console.log(maxSatisfaction([-1, -4, -5])); // 0
console.log(maxSatisfaction([-2, 5, -1, 0, 3, -3])); // 35