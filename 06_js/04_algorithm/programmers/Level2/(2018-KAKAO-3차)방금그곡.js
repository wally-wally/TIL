function extendMusicScore(splitedMusicScore, musicTime) {
  const musicScoreLength = splitedMusicScore.length;
  let copiedMusicScore = splitedMusicScore.slice();
  if (musicTime > musicScoreLength) {
    let copyCount = 1;
    while (copyCount < parseInt(musicTime / musicScoreLength)) {
      copiedMusicScore = copiedMusicScore.concat(splitedMusicScore);
      copyCount += 1;
    }
    copiedMusicScore = copiedMusicScore.concat(splitedMusicScore.slice(0, musicTime % musicScoreLength));
    return copiedMusicScore;
  } else {
    return splitedMusicScore.slice(0, musicTime);
  }
}


function splitMusicScore(musicScore) {
  let splitMusicScore = [];
  for (const score of musicScore) {
    if (score !== '#') {
      splitMusicScore.push(score);
    } else {
      let lastMusicScale = splitMusicScore[splitMusicScore.length - 1];
      splitMusicScore[splitMusicScore.length - 1] = lastMusicScale + '#';
    }
  }
  return splitMusicScore;
}


function calcMusicTime(startTime, endTime) {
  let [startHour, startMinute] = startTime.split(':').map(val => Number(val));
  let [endHour, endMinute] = endTime.split(':').map(val => Number(val));
  return (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
}


function solution(m, musicInfos) {
  let musicsEqualMemoryScore = [];
  let memoryScore = splitMusicScore(m);
  musicInfos.forEach((musicInfo, index) => {
    let [startTime, endTime, musicTitle, musicScore] = musicInfo.split(',');
    // (1) 시간 계산
    const musicTime = calcMusicTime(startTime, endTime);

    // (2) 음계 단위로 악보 분할
    let splitedMusicScore = splitMusicScore(musicScore);
    
    // (3) 계산한 음악 시간에 따라 악보 늘리기
    musicScore = extendMusicScore(splitedMusicScore, musicTime);

    // (4) 늘린 악보 기억한 멜로디 길이만큼 순회하면서 매칭되는 음악 찾기
    for (let i = 0; i < musicScore.length; i++) {
      if (memoryScore.join('') === musicScore.slice(i, i + memoryScore.length).join('')) {
        musicsEqualMemoryScore.push({ musicTitle, musicTime, index });
        break;
      }
    }
  });

  // (5) 조건에 맞는 정답 찾기
  if (!musicsEqualMemoryScore.length) {
    return '(None)';
  } else {
    const sortedMusics = musicsEqualMemoryScore.sort((a, b) => {
      if (a.musicTime !== b.musicTime) {
        return b.musicTime - a.musicTime;
      } else {
        return a.index - b.index;
      }
    });
    return sortedMusics[0].musicTitle;
  }
}

console.log(solution('ABCDEFG', [
  '12:00,12:14,HELLO,CDEFGAB',
  '13:00,13:05,WORLD,ABCDEF'
]));
console.log(solution('CC#BCC#BCC#BCC#B', [
  '03:00,03:30,FOO,CC#B', 
  '04:00,04:08,BAR,CC#BCC#BCC#B'
]));
console.log(solution('ABC', [
  '12:00,12:14,HELLO,C#DEFGAB', 
  '13:00,13:05,WORLD,ABCDEF'
]));