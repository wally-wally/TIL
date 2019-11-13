import sys
sys.stdin = open('input_1868.txt', 'r')

def DFS(r, c):
    global check_pixel
    for k in range(8):
        new_r, new_c = r + dx[k], c + dy[k]
        if 0 <= new_r < N and 0 <= new_c < N:
            if not visited[new_r][new_c]:
                visited[new_r][new_c] = 1
                check_pixel += 1
                if mine_cnt_map[new_r][new_c] == 0:
                    DFS(new_r, new_c)
    return


# 8방향 direction 리스트 선언
dx, dy = [-1, -1, 0, 1, 1, 1, 0, -1], [0, 1, 1, 1, 0, -1, -1, -1]

for tc in range(int(input())):
    N = int(input())
    mine_map = [input() for _ in range(N)] # 지뢰찾기 지도
    mine_cnt_map = [[0] * N for _ in range(N)] # 각 칸의 8방향의 지뢰 개수
    visited = [[0] * N for _ in range(N)] # 방문 리스트
    no_mine_points = [] # 8방향 지뢰 개수가 0인 지점들
    mine_count = 0 # 지뢰 총 개수

    # 각 칸이 '.'인 경우 8방향 지뢰개수 계산, '*'인 경우 -1로 대입
    for idx in range(N * N):
        row, col = idx // N, idx % N
        if mine_map[row][col] == '*':
            mine_cnt_map[row][col] = -1
            mine_count += 1
        else:
            mine_cnt = 0 # 8방향 지뢰 개수가 0인지 알기 위해 사용되는 임시 변수
            for n in range(8): # 8방향 체크
                new_row, new_col = row + dx[n], col + dy[n]
                if 0 <= new_row < N and 0 <= new_col < N:
                    if mine_map[new_row][new_col] == '*':
                        mine_cnt += 1
            mine_cnt_map[row][col] = mine_cnt
            if mine_cnt == 0:
                no_mine_points.append((row, col))

    DFS_cnt, check_pixel = 0, 0 # DFS 덩어리 개수(= 연쇄적으로 열리는 경우의 개수) / 0 이상의 칸 들 중 체크한 칸 수
    while no_mine_points: # 8방향 지뢰 개수가 0인 지점들로만 기준으로 하여 DFS를 수행
        point = no_mine_points.pop(0)
        if not visited[point[0]][point[1]]:
            visited[point[0]][point[1]] = 1
            check_pixel, DFS_cnt = check_pixel + 1, DFS_cnt + 1
            DFS(point[0], point[1])
    no_check_cnt = N * N - mine_count - check_pixel # 1 이상의 칸 들 중 체크 안 한 칸 수
    print('#{} {}'.format(tc + 1, DFS_cnt + no_check_cnt))