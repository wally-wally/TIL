import sys
sys.stdin = open('input_1987.txt', 'r')

diff = [(0, 1), (1, 0), (0, -1), (-1, 0)]
def DFS(x, y, d):
    global max_depth
    if max_depth < d:
        max_depth = d
    if max_depth == 26:
        return True
    visit[arr[x][y]] = True

    for (dx, dy) in diff:
        tx, ty = x + dx, y + dy
        if tx == -1 or tx == R or ty == -1 or ty == C or visit[arr[tx][ty]]:
            continue
        if DFS(tx, ty, d + 1): return True
    visit[arr[x][y]] = False
    return False

R, C = map(int, input().split())
arr = []
for i in range(R):
    arr.append(list(map(ord, input())))
visit = [False for _ in range(128)]
max_depth = 0
DFS(0, 0, 0)
print(max_depth + 1)