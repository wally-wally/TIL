# :keyboard: 11/12 Algorithm Solution Idea

---

:heavy_check_mark: 11/12에 진행한 모든 문제는 SW Expert Academy의 문제입니다.

:heavy_check_mark: 문제 푸는 순서(난이도별) : `키 순서` => `등산로 조성` => `점심 식사시간`

---

<br>

### [5643] [Professional] 키 순서 <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWXQsLWKd5cDFAUo" target="_blank">(Go to Problem)</a>

- Queue 빈 리스트를 하나 만들어 <b><u>BFS</u></b> 방법으로 나보다 크거나 작은 사람의 개수를 알 수 있다.
- 만들어야 할 것 : 인접 리스트(정방향), 인접 리스트(역방향), visited 리스트, BFS 함수

- 나보다 큰 사람 : 화살표 정방향에 대한 인접 행렬 또는 인접 리스트로 고려

- 나보다 작은 사람 : <b>화살표 역방향에 대한 인접 행렬 또는 인접 리스트를 하나 더 만들어서 고려</b>
- 인접 행렬보다는 인접 리스트가 메모리 관리 측면에서 더 효율적이다. (연결된 정보만 고려하면 되기 때문)
- 조건 판단 : `나보다 큰 사람 수 + 나보다 작은 사람 수 + 1(1은 자기 자신) = N(전체 인원 수)`
- BFS 함수를 통해 방문하는 정점의 개수를 return해야 위 조건 판단식에서 나보다 큰 사람 수나 나보다 작은 사람 수를 사용할 수 있다.

<br>

### [1949] [모의 SW 역량테스트] 등산로 조성 <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5PoOKKAPIDFAUq&categoryId=AV5PoOKKAPIDFAUq&categoryType=CODE" target="_blank">(Go to Problem)</a>

- 문제에서 ` 가로 또는 세로 방향으로 연결이 되어야 한다. ` 라는 문구가 있는 것으로 보아 동, 서, 남, 북 4방향만 체크하면 된다.
- 또한 ` 반드시 높은 지형에서 낮은 지형으로 ` 라는 문구로 보아 이동할 때마다 요소의 값이 매번 작아져야 한다는 것을 알 수 있다.
- 하지만 불편한 조건 등장... - `최대 K 깊이만큼 지형을 깎는다라 뭐라나...`
- 먼저 봉우리 가장 높은 곳을 다 찾고 안 깎는 상태에서 갈 수 있는 등산로의 최대 길이를 계산한다.
- 그 다음에 깎을 수 있는 경우를 고려하여 등산로의 최대 길이를 계산한다.
- 이동조건 : `현재 봉우리보다 작아야 한다.` + `현재 봉우리보다 크지만 공사를 했을 때(K 만큼 뺐을 때) 이동할 수 있으면 이동`

<br>

### [2383] [모의 SW 역량테스트] 점심 식사시간 <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5-BEE6AK0DFAVl&categoryId=AV5-BEE6AK0DFAVl&categoryType=CODE" target="_blank">(Go to Problem)</a>

- 계단 입구까지 이동 시간 = `계단 입구까지 가는 시간` + `1분(대기 시간)`

- 까다로운 조건 : ` 계단 위에는 동시에 최대 3명까지만 올라가 있을 수 있다. `

- 구해야 하는 것 : ` 모든 사람들이 계단을 내려가 이동이 완료되는 시간이 최소가 되는 경우 ` => 마지막 사람이 내려갈 때의 시간

- 계단을 이용하기 위해 기다려야 하는 시간
  - 그 계단을 이용한 사람 중에서 계단을 먼저 이용한 사람의 식당에 가장 먼저 도착한 시간을 7분이라고 가정하면 다른 사람이 그 계단을 이용하기 위해 최소 7 + 계단 길이(2라고 가정) = 9분은 걸리게 됨을 알 수 있다.