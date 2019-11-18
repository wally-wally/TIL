# :keyboard: 11/13 Algorithm Solution Idea

---

:heavy_check_mark: 11/13에 진행한 모든 문제는 SW Expert Academy의 문제입니다.

---

<br>

### [1868] 파핑파핑 지뢰찾기 <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5LwsHaD1MDFAXc&categoryId=AV5LwsHaD1MDFAXc&categoryType=CODE" target="_blank">(Go to Problem)</a>

- 0을 클릭했을 때 8방향에 0이 한 개도 안 나올때까지 또는 visited 방문 리스트 조건까지 연쇄적으로 8방향 체크
- 폭탄 위치에 따른 폭탄 맵을 하나 만든다.
  - 폭탄은 -1, `.` 칸은 8방향에 있는 폭탄의 개수를 넣자고 가정하자.
- 똑같은 사이즈의 visited 리스트를 만들고 0인 지점을 우선적으로 클릭한다고 생각하자.
  - 8방향에 더 이상 0이 안 나올 때까지 연쇄적으로 열린다.
  - 8방향 체크시 그 체크하는 칸의 visited 리스트를 1로 바꾼다.
- 0이 더 이상 나오지 않는 경우 그 때 result(최소 클릭 횟수)에 +1을 증가한다.
- 이후 0을 체크한 후 visited 리스트에서 체크되지 않은 칸 들의 개수만큼 result에 더한다.

<br>

### [4008] [모의 SW 역량테스트] 숫자 만들기 <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWIeRZV6kBUDFAVH&categoryId=AWIeRZV6kBUDFAVH&categoryType=CODE" target="_blank">(Go to Problem)</a>

- 숫자 위치는 고정한 채 연산자의 순서를 조합을 이용하여 계산할 수 있다.

<br>

### [2117] [모의 SW 역량테스트] 홈 방범 서비스 <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5V61LqAf8DFAWu&categoryId=AV5V61LqAf8DFAWu&categoryType=CODE" target="_blank">(Go to Problem)</a>

- 도시의 크기(N)이 20 이하 이므로 (0, 0) 지점을 중심으로 도시 전체를 덮을 때까지 마름모 영역을 확장시켜보자
- 이 때 중요한 포인트는 K가 언제까지 커져야 하는지 잡아야 한다. => 단순히 N까지만 늘리면 안 됨!
- [참고] `2117_1.py` : 처음 구현했던 알고리즘, 하지만 실행시간이 7초 정도 걸리는 구문...
- [참고] `2117_2.py` : 실행시간이 줄이기 위해 다시 작성한 알고리즘