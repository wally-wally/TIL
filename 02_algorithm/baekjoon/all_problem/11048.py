import sys
sys.stdin = open('input_11047.txt', 'r')

N, M = map(int, input().split())
candy = [list(map(int, input().split())) for _ in range(N)]
DP = [[0] * M for __ in range(N)]
# 1 행 base case 설정
for c in range(M):
    if c == 0:
        DP[0][c] = candy[0][0]
    else:
        DP[0][c] = DP[0][c - 1] + candy[0][c]
# 1 열 base case 설정
for r in range(1, N):
    DP[r][0] = DP[r - 1][0] + candy[r][0]

# 나머지 칸 DP로 접근
for i in range(1, N):
    for j in range(1, M):
        DP[i][j] = max(DP[i - 1][j], DP[i][j - 1], DP[i - 1][j - 1]) + candy[i][j]
print(DP[N - 1][M - 1])