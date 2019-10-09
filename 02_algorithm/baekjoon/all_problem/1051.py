import sys
sys.stdin = open('input_1051.txt', 'r')

N, M = map(int, input().split())
arr = [[int(num) for num in input()] for _ in range(N)]
result, dis_value = 1, 1
for idx in range(N * M):
    i, j = idx // M, idx % M
    if i + dis_value >= N | j + dis_value >= M: break
    dis = 1
    while True:
        if i + dis == N or j + dis == M: break
        if arr[i][j] == arr[i + dis][j] == arr[i][j + dis] == arr[i + dis][j + dis]:
            result = max(result, (dis + 1) ** 2)
            dis_value = max(dis_value, dis)
        dis += 1
print(result)