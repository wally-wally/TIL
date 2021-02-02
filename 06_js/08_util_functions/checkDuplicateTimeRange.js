// 시간 범위 데이터가 여러 개 주어질 때 서로 중복되는 범위가 한 개 이상 존재하는지 확인하는 로직이다.

let times1 = [
  {
    'start_at': '09:00',
    'end_at': '11:00',
  },
  {
    'start_at': '09:10',
    'end_at': '11:10',
  },
  {
    'start_at': '11:00',
    'end_at': '13:00',
  },
  {
    'start_at': '09:00',
    'end_at': '13:00',
  },
];

let times2 = [
  {
    'start_at': '09:00',
    'end_at': '11:00',
  },
  {
    'start_at': '11:00',
    'end_at': '13:00',
  },
  {
    'start_at': '23:30',
    'end_at': '25:00',
  },
];

let times3 = [
  {
    'start_at': '11:00',
    'end_at': '13:00',
  },
  {
    'start_at': '09:00',
    'end_at': '10:50',
  },
  {
    'start_at': '13:00',
    'end_at': '13:30',
  },
];

let times4 = [
  {
    'start_at': '19:00',
    'end_at': '19:30',
  },
  {
    'start_at': '18:30',
    'end_at': '19:30',
  },
  {
    'start_at': '18:00',
    'end_at': '19:30',
  },
  {
    'start_at': '16:00',
    'end_at': '17:30',
    'type': 'multi',
  },
];

//! isDuplicationInTimeRange 함수에서 쓰일 array의 각 원소에 분 단위로 변환된 시간 값을 추가하는 로직
const regenerateTimesArr = times => {
  const convertMinuteValue = (hour, minute) => hour * 60 + minute;

  return times.map(time => {
    const [startHour, startMinute] = time.start_at.split(':').map(v => Number(v));
    const [endHour, endMinute] = time.end_at.split(':').map(v => Number(v));

    return {
      ...time,
      startValue: convertMinuteValue(startHour, startMinute),
      endValue: convertMinuteValue(endHour, endMinute),
    };
  });
};

//! 시간 범위 중복 확인 함수(true면 중복 존재, false면 중복 존재하지 않음)
//* 참고로 한 시간 범위의 끝 지점과 다른 시간 범위의 시작지점이 일치하는 경우는 중복되지 않는다고 간주한다.
//* (times의 각 원소의 객체에 'start_at'과 'end_at'은 반드시 포함되어야 하는 key 값이고 그 외는 있어도 되고 없어도 됨)
export const isDuplicationInTimeRange = times => {
  let rightPointer = Number.MIN_SAFE_INTEGER;

  const regenTimes = regenerateTimesArr(times);
  regenTimes.sort((a, b) => (a.startValue !== b.startValue ? a.startValue - b.startValue : a.endValue - b.endValue));

  for (const { startValue, endValue } of regenTimes) {
    if (startValue < rightPointer || endValue < rightPointer) {
      return true;
    }
    rightPointer = endValue;
  }
  return false;
};

console.log(isDuplicationInTimeRange(times1)); // true
console.log(isDuplicationInTimeRange(times2)); // false
console.log(isDuplicationInTimeRange(times3)); // false
console.log(isDuplicationInTimeRange(times4)); // true
