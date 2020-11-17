function solution(operations) {
  let queue = [];
  for (const operation of operations) {
    const [oper, number] = operation.split(' ');
    if (oper === 'I') {
      queue.push(Number(number));
      continue;
    }
    if (queue.length === 0) {
      continue;
    }
    let maxValue = number === '1' ? Math.max(...queue) : Math.min(...queue);
    queue.splice(queue.indexOf(maxValue), 1);
  }
  if (queue.length === 0) {
    return [0, 0];
  }
  queue.sort((a, b) => b - a);
  return [queue[0], queue[queue.length - 1]];
}

console.log(solution(['I 16', 'D 1']));
console.log(solution(['I 7', 'I 5', 'I -5', 'D -1']));