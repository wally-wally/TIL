import sys
sys.stdin = open('input_14502.txt', 'r')

def DFS(r, c):
    value = 1
    visit[r][c] = True
    for direct in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        new_r, new_c = r + direct[0], c + direct[1]
        if new_r < 0 or new_r >= N or new_c < 0 or new_c >= M: continue
        if not visit[new_r][new_c] and not arr[new_r][new_c]:
            value += DFS(new_r, new_c)
    return value

def add_wall(x, y, wall_cnt):
    global min_virus, visit
    if wall_cnt == 3:
        virus_diffusion = 0
        visit = [[False] * M for _ in range(N)]
        for point in virus_points:
            virus_diffusion += DFS(point[0], point[1])
        min_virus = min(min_virus, virus_diffusion)
        return
    for r_idx in range(x, N):
        for c_idx in range(y if r_idx == x else 0, M):
            if not arr[r_idx][c_idx]:
                arr[r_idx][c_idx] = 1
                add_wall(r_idx, c_idx + 1, wall_cnt + 1)
                arr[r_idx][c_idx] = 0

N, M = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]
visit = [[False] * M for _ in range(N)]
virus_points, min_virus, exist_wall = [], 0xffff, 0
for idx in range(N * M):
    i, j = idx // M, idx % M
    if arr[i][j] == 1:
        exist_wall += 1
    if arr[i][j] == 2:
        virus_points.append((i, j))
add_wall(0, 0, 0)
print(N * M - min_virus - exist_wall - 3)