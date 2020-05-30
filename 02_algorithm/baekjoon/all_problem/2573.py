import sys
sys.stdin = open('input_2573.txt', 'r')

# pypy3로 통과 (시간: 896[ms])
def isolate_check():
    check_ice_cnt = 0
    for idx in range(N * M):
        r, c = idx // M, idx % M
        if ice_land[r][c]:
            queue = [(r, c)]
            visited[r][c] = True
            while queue:
                pop_elem = queue.pop()
                check_ice_cnt += 1
                for i in range(4):
                    new_row, new_col = pop_elem[0] + dx[i], pop_elem[1] + dy[i]
                    if 0 <= new_row < N and 0 <= new_col < M:
                        if ice_land[new_row][new_col] > 0 and not visited[new_row][new_col]:
                            visited[new_row][new_col] = True
                            queue.append((new_row, new_col))
            break
    return check_ice_cnt


def BFS(r, c):
    queue = [(r, c)]
    visited[r][c] = True
    melt_info = []
    while queue:
        pop_elem = queue.pop()
        melt_cnt = 0
        for i in range(4):
            new_row, new_col = pop_elem[0] + dx[i], pop_elem[1] + dy[i]
            if 0 <= new_row < N and 0 <= new_col < M:
                if ice_land[new_row][new_col] > 0 and not visited[new_row][new_col]:
                    visited[new_row][new_col] = True
                    queue.append((new_row, new_col))
                elif ice_land[new_row][new_col] == 0:
                    melt_cnt += 1
        melt_info.append((pop_elem[0], pop_elem[1], melt_cnt))

    all_melt_cnt = 0
    for melt in melt_info:
        if ice_land[melt[0]][melt[1]] <= melt[2]:
            after_melt_height = 0
            all_melt_cnt += 1
        else:
            after_melt_height = ice_land[melt[0]][melt[1]] - melt[2]
        ice_land[melt[0]][melt[1]] = after_melt_height
    return all_melt_cnt


N, M = map(int, input().split())
ice_land, ice_cnt = [], 0
for _ in range(N):
    ice_line = list(map(int, input().split()))
    ice_cnt += len(list(filter(lambda x: x > 0, ice_line)))
    ice_land.append(ice_line)
dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)

year = 0
while True:
    year += 1
    visited = [[False] * M for _ in range(N)]
    for idx in range(N * M):
        row, col = idx // M, idx % M
        if ice_land[row][col] and not visited[row][col]:
            melt_cnt = BFS(row, col)
            ice_cnt -= melt_cnt
            break
    else:
        print(0)
        break

    visited = [[False] * M for _ in range(N)]
    if ice_cnt != isolate_check():
        print(year)
        break