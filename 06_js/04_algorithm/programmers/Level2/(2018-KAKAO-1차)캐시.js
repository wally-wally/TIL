function solution(cacheSize, cities) {
  let answer = 0;
  let cache = [];
  let usedPages = [];
  cities = cities.map(city => city.toLowerCase());
  if (cacheSize === 0) {
    return cities.length * 5;
  }
  for (const city of cities) {
    let changeRecentUsedPage;
    if (!cache.includes(city)) {
      if (cache.length === cacheSize) {
        changeRecentUsedPage = usedPages.shift();
        cache[changeRecentUsedPage] = city;
      } else {
        cache.push(city);
        changeRecentUsedPage = cache.length - 1;
      }
      answer += 5;
    } else {
      changeRecentUsedPage = usedPages.splice(usedPages.indexOf(cache.indexOf(city)), 1)[0];
      answer += 1;
    }
    usedPages.push(changeRecentUsedPage);
  }
  return answer;
}

console.log(solution(3, [
  'Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA'
]));
console.log(solution(3, [
  'Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul'
]));
console.log(solution(2, [
  'Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'SanFrancisco', 'Seoul', 'Rome', 'Paris', 'Jeju', 'NewYork', 'Rome'
]));
console.log(solution(5, [
  'Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'SanFrancisco', 'Seoul', 'Rome', 'Paris', 'Jeju', 'NewYork', 'Rome'
]));
console.log(solution(3, [
  'a', 'b', 'c', 'a', 'd', 'a', 'e', 'f', 'c', 'f'
]));
console.log(solution(5, [
  'a', 'a', 'a'
]));