function checkAvailableUnlock(row, col, rotateKey, newLock, keyLength) {
  let matchingCount = 0;
  for (let i = row; i < row + keyLength; i++) {
    for (let j = col; j < col + keyLength; j++) {
      if (newLock[i][j] === null) {
        continue;
      }
      if (rotateKey[i - row][j - col] === 1 && newLock[i][j] === 1) {
        return 0;
      }
      if (rotateKey[i - row][j - col] === 1 && newLock[i][j] === 0) {
        matchingCount += 1;
      }
    }
  }
  return matchingCount;
}


function rotateKey(key) {
  const keys = [key];

  // (1) 시계 방향 90도 회전
  let newKey = [];
  for (let i = 0; i < key.length; i++) {
    let newKeyLine = [];
    for (let j = key.length - 1; j >= 0; j--) {
      newKeyLine.push(key[j][i]);
    }
    newKey.push(newKeyLine);
  }
  keys.push(newKey);

  // (2) 시계 방향 180도 회전
  newKey = [];
  for (let i = key.length - 1; i >= 0; i--) {
    let newKeyLine = [];
    for (let j = key.length - 1; j >= 0; j--) {
      newKeyLine.push(key[i][j]);
    }
    newKey.push(newKeyLine);
  }
  keys.push(newKey);

  // (3) 시계 방향 270도 회전
  newKey = [];
  for (let i = key.length - 1; i >= 0; i--) {
    let newKeyLine = [];
    for (let j = 0; j < key.length; j++) {
      newKeyLine.push(key[j][i]);
    }
    newKey.push(newKeyLine);
  }
  keys.push(newKey);
  return keys;
}


function pushNullValueArray(length) {
  const nullArr = [];
  for (let i = 0; i < length; i++) {
    nullArr.push(null);
  }
  return nullArr;
}


function solution(key, lock) {
  let newLock = [];
  let lockHoleCount = 0; // 자물쇠의 홈 개수
  const newLockLength = 2 * (key.length - 1) + lock.length; // 새로 만든 자물쇠의 길이

  // (1) 자물쇠 바깥 영역 null로 채우기
  for (let i = 0; i < newLockLength; i++) {
    let tempLockLine = [];
    if (i < key.length - 1 || i > key.length + lock.length - 2) {
      tempLockLine = [...pushNullValueArray(newLockLength)];
    } else {
      tempLockLine = [...pushNullValueArray(key.length - 1)]
      for (let j = 0; j < lock.length; j++) {
        tempLockLine.push(lock[i - (key.length - 1)][j]);
        if (lock[i - (key.length - 1)][j] === 0) {
          lockHoleCount += 1;
        }
      }
      for (const nullValue of pushNullValueArray(key.length - 1)) {
        tempLockLine.push(nullValue);
      }
    }
    newLock.push(tempLockLine);
  }

  // (2) 열쇠 0도, 90도, 180도, 270도 회전했을 때 상태 저장
  const rotateKeys = rotateKey(key);

  // (3) for문 돌면서 조건에 맞는 경우 있는지 check => 있으면 break
  for (let i = 0; i < (newLockLength - key.length + 1) ** 2; i++) {
    const row = parseInt(i / (newLockLength - key.length + 1));
    const col = i % (newLockLength - key.length + 1);
    for (const rotateKey of rotateKeys) {
      if (checkAvailableUnlock(row, col, rotateKey, newLock, key.length) === lockHoleCount) {
        return true;
      }
    }
  }
  return false;
}

console.log(solution([
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 1]
], [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1]
]));