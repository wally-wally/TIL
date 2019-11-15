# :keyboard: 11/15 Algorithm Solution Idea

---

:heavy_check_mark: 11/15에 진행한 모든 문제는 SW Expert Academy의 문제입니다.

---

<br>

### [2105] [모의 SW 역량테스트] 디저트 카페 <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5VwAr6APYDFAWu&categoryId=AV5VwAr6APYDFAWu&categoryType=CODE" target="_blank">(Go to Problem)</a>

- 회전하는 방향을 시계 방향 또는 반시계 방향으로 돌자고 먼저 정하고 시작하자.
- 판단하는 경우는 두 가지로 나뉜다.
  - 같은 방향으로 계속 갈 수 있을 때까지 한 번 가본다. => `시작한 방향으로 계속 가고`
  - 더 이상 갈 수 없으면 되돌아와서 초기에 정한 방향에서 90도 한 번 회전하여 판단한다. => `더 이상 못 가면 한 번 꺾고`
- 이 과정을 반복하여 디저트 카페 투어 경로에서 숫자가 중복되지 않고 처음에 시작한 지점의 좌표로 돌아오는 경우 디저트의 종류 개수를 확인하면 된다.

<br>

### [4013] [모의 SW 역량테스트] 특이한 자석 <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWIeV9sKkcoDFAVH&categoryId=AWIeV9sKkcoDFAVH&categoryType=CODE" target="_blank">(Go to Problem)</a>

- 회전할 때 변화
  - 자성정보를 리스트에 담고 회전방향이 시계방향인 경우 모든 값을 오른쪽으로 한 칸 이동시킨 것과 같다. 이 때 맨 끝의 요소는 회전하므로 맨 앞으로 들어간다. => `인덱스 값 변경`
  - 반시계 방향으로 회전하는 경우 모든 값을 왼쪽으로 한 칸 이동시킨 것과 같고 맨 끝의 요소는 맨 뒤로 들어간다.
- 맞물려있는 값 판단
  - 1번 자석을 시계 방향으로 회전한다고 할 때 맞물린 날의 인덱스가 2번이므로 2번 자석의 인덱스가 6번인 날과 자성을 비교하면 된다.
  - 중간에 있는 자석을 회전한다고 할 때는 양 옆의 자성을 비교해야 한다.
  - 시계 방향일 때와 반시계 방향일 때 판단하는 인덱스 번호를 잘 구별해서 판단하자.

<br>

### [5653] [모의 SW 역량테스트] 줄기세포배양 <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWXRJ8EKe48DFAUo&categoryId=AWXRJ8EKe48DFAUo&categoryType=CODE" target="_blank">(Go to Problem)</a>

- 값이 a인 비활성상태 셀이 있을 때 a 시간 후이면 활성상태가 되고 a + 1 시간 후에 4방향으로 번식이 되고 2a 시간일 때 이 셀은 죽은 상태가 된다.
- 초기 맵 정보를 받고 각 셀의 초기 숫자값을 우선 저장한다.
- 현재 상태 맵을 먼저 저장하고 번식이 일어나면 맵 정보가 바뀌므로 저장하고 기존 맵과 새로 바뀐 맵을 비교하여 바뀐 셀을 파악하는데 이 때 조건은 `비활성 => 활성`으로 바뀌는 것을 체크해야 한다.
- 그리고 주의할 것은 같은 셀에 동시에 번식이 들어오는 경우가 있다. 더 큰 값이 들어오는 것을 우선으로 하도록 설정해야 한다.
- 두 가지의 `시간 개념`을 체크해야 한다.
  - 문제에서 주어진 전체 시간(K)을 고려해야 한다.
  - 각 셀에 따라 생성되는 시점이 모두 다르므로 각 셀의 생성시점부터 각 셀마다 흐르는 시간 정보를 저장하고 고려해야 한다.