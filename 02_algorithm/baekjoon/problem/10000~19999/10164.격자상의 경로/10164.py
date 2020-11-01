import sys
sys.stdin = open('input_10164.txt', 'r')

def route(number, s, e, row, col):
    for i in range(s, row + 1):
        for j in range(e, col + 1):
            if i == s and j == e: continue
            elif i == 0 or j == 0:
                DP[i][j] = DP[s][e]
            else:
                DP[i][j] = DP[i - 1][j] + DP[i][j - 1]
            if arr[i][j] == number:
                return DP[i][j]

N, M, K = map(int, input().split())
num, must_check = 0, (N - 1, M - 1)
arr = []
for a in range(N):
    line = []
    for b in range(M):
        num += 1
        line.append(num)
        if num == K:
            must_check = (a, b)
    arr.append(line)
DP = [[0] * M for _ in range(N)]
DP[0][0] = 1
result = route(num, 0, 0, must_check[0], must_check[1])
print(result if not K else route(num, must_check[0], must_check[1], N - 1, M - 1))