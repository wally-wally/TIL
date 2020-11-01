import sys
sys.stdin = open('input_17086.txt', 'r')

def BFS():
    while queue:
        shark = queue.pop(0)
        for i in range(8):
            new_r, new_c = shark[0] + dx[i], shark[1] + dy[i]
            if 0 <= new_r < N and 0 <= new_c < M:
                if not shark_map[new_r][new_c]:
                    queue.append((new_r, new_c))
                    shark_map[new_r][new_c] = shark_map[shark[0]][shark[1]] + 1


N, M = map(int, input().split())
shark_map = [list(map(int, input().split())) for _ in range(N)]
dx, dy = (-1, -1, 0, 1, 1, 1, 0, -1), (0, 1, 1, 1, 0, -1, -1, -1)
queue = []
for idx in range(N * M):
    row, col = idx // M, idx % M
    if shark_map[row][col]:
        queue.append((row, col))
BFS()
print(max(map(max, shark_map)) - 1)