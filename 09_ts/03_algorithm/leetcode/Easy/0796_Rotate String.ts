const rotateString = (s: string, goal: string): boolean => {
  const strLength = s.length;
  const goalStrLength = goal.length;

  if (strLength !== goalStrLength) {
    return false;
  }

  if (s.length === 0 && strLength === goalStrLength) {
    return true;
  }

  for (let idx = 1; idx < strLength; idx++) {
    const rotateStr = s.slice(idx, strLength) + s.slice(0, idx);

    if (rotateStr === goal) {
      return true;
    }
  }

  return false;
};