import sys
sys.stdin = open('input_15683.txt', 'r')

def watch(x, y, d, o):
    for k in range(4):
        if d & (1 << k):
            nx, ny = x, y
            while arr[ny][nx] != 6:
                brr[ny][nx] += o
                nx, ny = nx + dx[k], ny + dy[k]

def dfs(cctv_num):
    global min_value

    if cctv_num == len(cctvs):
        blind = 0
        for y in range(1, N + 1):
            blind += brr[y].count(0)
        min_value = min(min_value, blind)
        return

    x, y, cctv = cctvs[cctv_num]
    for d in direct[cctv]:
        watch(x, y, d, 1)
        dfs(cctv_num+1)
        watch(x, y, d, -1)

N, M = map(int, input().split())
arr = [[6] * (M + 2)]
for _ in range(N):
    arr.append([6] + list(map(int, input().split())) + [6])
arr.append([6] * (M + 2))
brr = [[0] * (M + 2) for _ in range(N + 2)]

cctvs = []
dx, dy = (0, 1, 0, -1), (-1, 0, 1, 0)
T, R, B, L = 1, 2, 4, 8

direct = [
    [0],
    [T, R, B, L],
    [T|B, R|L],
    [T|R, R|B, B|L, L|T],
    [T|R|B, R|B|L, B|L|T, L|T|R],
    [T|R|B|L]
]

for y in range(N + 2):
    for x in range(M + 2):
        if arr[y][x] == 6:
            brr[y][x] = 1
        elif arr[y][x]:
            cctvs.append((x, y, arr[y][x]))

min_value = M*N
dfs(0)
print(min_value)