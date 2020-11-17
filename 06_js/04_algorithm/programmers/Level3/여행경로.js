function findRoute(tickets, nations, visitedRouteIndex, visitedNations, visitedAirport, startNation, answer) {
  if (visitedRouteIndex.length === tickets.length) {
    if (nations.size === visitedNations.length) {
      const airportRoute = visitedAirport.join();
      // 문자열을 비교하여 알파벳 순서가 앞서는 경로를 정답으로 선택
      if (answer === null || answer > airportRoute) {
        return airportRoute;
      }
    }
    return answer;
  }
  for (const ticketIndex in tickets) {
    // 사용하려는 티켓의 출발 공항이 이전 공항 경로의 도착 공항과 같고 해당 티켓을 사용하지 않은 경우
    if (startNation === tickets[ticketIndex][0] && !visitedRouteIndex.includes(ticketIndex)) {
      visitedRouteIndex.push(ticketIndex);
      let pushCount = 0;
      // 해당 티켓의 출발 공항과 도착 공항이 방문한 공항 리스트에 있는지 확인 후 없으면 추가
      for (let i = 0; i < 2; i++) {
        if (!visitedNations.includes(tickets[ticketIndex][i])) {
          visitedNations.push(tickets[ticketIndex][i]);
          pushCount += 1;
        }
      }
      visitedAirport.push(tickets[ticketIndex][1]);
      answer = findRoute(tickets, nations, visitedRouteIndex, visitedNations, visitedAirport, tickets[ticketIndex][1], answer);
      // 원상 복구
      visitedAirport.pop();
      visitedRouteIndex.pop();
      while (pushCount > 0) {
        visitedNations.pop();
        pushCount -= 1;
      }
    }
  }
  return answer;
}

function solution(tickets) {
  let nations = [];
  for (const ticket of tickets) {
    nations.push(...ticket);
  }
  // findRoute 함수 인자 설명
  // ticket 배열, 공항 종류, 사용한 티켓의 인덱스 모음,
  // 방문한 공항들(중복 제거), 방문한 공항들(중복 포함, 추후 정답 도출시 사용),
  // 도착 공항과 다음 출발 공항 비교할 때 사용, 중간 정답 결과
  let answer = findRoute(tickets, new Set(nations), [], [], ['ICN'], 'ICN', null);
  return answer.split(',');
}

console.log(solution([
  ['ICN', 'JFK'],
  ['HND', 'IAD'],
  ['JFK', 'HND']
]));
console.log(solution([
  ['ICN', 'SFO'],
  ['ICN', 'ATL'],
  ['SFO', 'ATL'],
  ['ATL', 'ICN'],
  ['ATL', 'SFO']
]));
console.log(solution([
  ['ICN', 'A'],
  ['A', 'C'],
  ['A', 'D'],
  ['D', 'B'],
  ['B', 'A']
]));
console.log(solution([
  ['ICN', 'A'],
  ['ICN', 'A'],
  ['A', 'ICN']
]));
console.log(solution([
  ['ICN', 'BOO'],
  ['ICN', 'COO'],
  ['COO', 'DOO'],
  ['DOO', 'COO'],
  ['BOO', 'DOO'],
  ['DOO', 'BOO'],
  ['BOO', 'ICN'],
  ['COO', 'BOO']
]));
console.log(solution([
  ['ICN', 'COO'],
  ['ICN', 'BOO'],
  ['COO', 'ICN'],
  ['BOO', 'DOO']
]));