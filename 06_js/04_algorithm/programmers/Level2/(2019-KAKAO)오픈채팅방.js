function solution(records) {
  let messages = [];
  let userInfo = new Map();
  records.forEach(record => {
    const [action, id, nickname] = record.split(' ');
    if (action === 'Enter') {
      messages.push([id, '님이 들어왔습니다.']);
    } else if (action === 'Leave') {
      messages.push([id, '님이 나갔습니다.']);
    }
    if (nickname) {
      userInfo.set(id, nickname);
    }
  });
  return messages.map(message => `${userInfo.get(message[0])}${message[1]}`);
}

console.log(solution([
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid1234",
  "Enter uid1234 Prodo",
  "Change uid4567 Ryan"
]));