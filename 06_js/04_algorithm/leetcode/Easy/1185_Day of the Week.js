const dayOfTheWeek = (day, month, year) => {
  const dayOfTheWeeks = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  return dayOfTheWeeks[new Date(`${year}-${month}-${day}`).getDay()];
};

console.log(dayOfTheWeek(2021, 5, 9)); // 'Sunday'