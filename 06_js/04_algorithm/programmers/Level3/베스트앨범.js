function solution(genres, plays) {
  let answer = [];
  let genresPlayCount = {};
  let playInfo = {};
  for (let i = 0; i < genres.length; i++) {
    if (genres[i] in genresPlayCount) {
      genresPlayCount[genres[i]] += plays[i];
      playInfo[genres[i]].push([plays[i], i]);
    } else {
      genresPlayCount[genres[i]] = plays[i];
      playInfo[genres[i]] = [[plays[i], i]];
    }
  }
  for (const info in playInfo) {
    let playInfoByGenre = playInfo[info];
    playInfo[info] = playInfoByGenre.sort((a, b) => a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]);
  }
  const genresSortedByPlayCount = Object.entries(genresPlayCount).sort((a, b) => b[1] - a[1]).map(val => val[0]);
  genresSortedByPlayCount.forEach(genre => {
    answer.push(...playInfo[genre].map(info => info[1]).slice(0, 2));
  });
  return answer;
}

console.log(solution(['classic', 'pop', 'classic', 'classic', 'pop'], [500, 600, 150, 800, 2500]));