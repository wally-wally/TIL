function simultaneousProcess(initTime, times) {
  let simultaneousProcessCount = 0;
  for (const time of times) {
    if ((time[0] <= initTime) && (time[1] >= initTime)
      || (0 <= time[0] - initTime) && (time[0] - initTime < 1000)
      || (0 <= time[1] - initTime) && (time[1] - initTime < 1000)) {
      simultaneousProcessCount += 1;
      continue;
    }
  }
  return simultaneousProcessCount;
}


function solution(lines) {
  let answer = 0;
  if (lines.length === 1) {
    return 1;
  }
  // (1) 계산한 시작 시간, 종료 시간의 문자열 표현식 값 저장
  let timeValues = []; 
  for (const line of lines) {
    const [date, time, processSeconds] = line.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, seconds] = time.split(':');
    const milliseconds = seconds.split('.')[1];
    const startDate = new Date(year, month, day, hour, minute, seconds);
    const finishDate = new Date(year, month, day, hour, minute, seconds);
    const convertProcessSeconds = Number(processSeconds.split('s')[0]) * 1000;
    const finishDateValue = finishDate.setMilliseconds(Number(milliseconds));
    const startDateValue = startDate.setMilliseconds(Number(milliseconds) - convertProcessSeconds + 1);
    timeValues.push([startDateValue, finishDateValue]);
  }

  // (2) 각 로그의 시작 시간, 종료 시간 기준으로 1초 범위 내에 동시 처리되는 처리량 계산
  const times = timeValues.sort((a, b) => a[0] - b[0]);
  for (const time of times) {
    let [startTime, finishTime] = time;
    answer = Math.max(answer, simultaneousProcess(startTime, times), simultaneousProcess(finishTime, times));
  }
  return answer;
}

console.log(solution([
  "2016-09-15 23:59:59.999 0.001s"
]));
console.log(solution([
  '2016-09-15 01:00:04.001 2.0s',
  '2016-09-15 01:00:07.000 2s'
]));
console.log(solution([
  '2016-09-15 01:00:04.002 2.0s',
  '2016-09-15 01:00:07.000 2s'
]));
console.log(solution([
  '2016-09-15 20:59:57.421 0.351s',
  '2016-09-15 20:59:58.233 1.181s',
  '2016-09-15 20:59:58.299 0.8s',
  '2016-09-15 20:59:58.688 1.041s',
  '2016-09-15 20:59:59.591 1.412s',
  '2016-09-15 21:00:00.464 1.466s',
  '2016-09-15 21:00:00.741 1.581s',
  '2016-09-15 21:00:00.748 2.31s',
  '2016-09-15 21:00:00.966 0.381s',
  '2016-09-15 21:00:02.066 2.62s'
]));