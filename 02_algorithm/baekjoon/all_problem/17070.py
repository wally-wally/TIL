import sys
sys.stdin = open('input_17070.txt', 'r')

# 3. DP로 해결하기(가장 빠름)
N = int(input())
home = [[0] * (N + 1)] + [[0] + list(map(int, input().split())) for _ in range(N)]
DP = [[[0] * 3 for _ in range(N + 1)] for _ in range(N + 1)]

DP[1][2][0] = 1
for i in range(1, N + 1):
    for j in range(1, N + 1):
        if j < N and not home[i][j + 1]:
            DP[i][j + 1][0] += DP[i][j][0] + DP[i][j][2]
        if i < N and not home[i + 1][j]:
            DP[i + 1][j][1] += DP[i][j][1] + DP[i][j][2]
        if i < N and j < N and not (home[i+1][j] or home[i][j + 1] or home[i + 1][j + 1]):
            DP[i + 1][j + 1][2] += DP[i][j][0] + DP[i][j][1] + DP[i][j][2]

print(sum(DP[N][N]))

# 2. pypy3 통과
def dfs(x, y, z):# → 0, ↘ 1, ↓ 2
    global k
    if x == n - 1 and y == n - 1: k += 1
    if z == 0 or z == 1: #파이프 방향 확인
        if y + 1 < n: # 맵을 넘지 못하게 설정
            if D[x][y + 1] == 0: # 칸에 벽이 없는지 확인
                dfs(x, y + 1, 0)
    if z == 0 or z == 1 or z == 2:
        if x + 1 < n and y + 1 < n:
            if D[x + 1][y] == D[x][y + 1] == D[x + 1][y + 1] == 0:
                dfs(x + 1, y + 1, 1)
    if z == 1 or z == 2:
        if x + 1 < n:
            if D[x + 1][y] == 0:
                dfs(x + 1, y, 2)
 
n = int(input())
D = [[*map(int, input().split())] for _ in range(n)]
k = 0
dfs(0, 1, 0)
print(k)

# 1. 맞는 코드이나 pypy3도 시간 초과...
N = int(input())
home = [list(map(int, input().split())) for _ in range(N)]
dx, dy = (0, 1, 1), (1, 0, 1)

def pipe(x, y, z):
    result = 0
    if x == N - 1 and y == N - 1:
        return 1
    for i in range(3):
        if i + z == 1: continue
        new_x, new_y = x + dx[i], y + dy[i]
        if new_x >= N or new_y >= N or home[new_x][new_y] == 1: continue
        if i == 2 and (home[x][y + 1] == 1 or home[x + 1][y] == 1): continue
        result += pipe(new_x, new_y, i)
    return result

print(pipe(0, 1, 0))