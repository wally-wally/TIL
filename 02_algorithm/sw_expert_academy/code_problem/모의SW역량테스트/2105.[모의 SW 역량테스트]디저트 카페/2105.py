import sys
sys.stdin = open('input_2105.txt', 'r')

def dessert_check(r, c, des_cnt, rot_cnt):
    global result
    new_r, new_c = r + dx[rot_cnt], c + dy[rot_cnt]
    if rot_cnt == 3 and new_r == init_row and new_c == init_col:
        result = max(result, des_cnt)
        return
    if 0 <= new_r < N and 0 <= new_c < N:
        if desserts[cafe_map[new_r][new_c]] == 0:
            desserts[cafe_map[new_r][new_c]] = 1
            dessert_check(new_r, new_c, des_cnt + 1, rot_cnt)
            if rot_cnt < 3:
                dessert_check(new_r, new_c, des_cnt + 1, rot_cnt + 1)
            desserts[cafe_map[new_r][new_c]] = 0

for tc in range(int(input())):
    N = int(input())
    cafe_map = [list(map(int, input().split())) for _ in range(N)]
    desserts = [0] * 101
    dx, dy = [-1, -1, +1, +1], [-1, +1, +1, -1] # 대각 4방향
    result = 0
    for idx in range(N * N):
        row, col = idx // N, idx % N
        init_row, init_col = row, col # 초기 상태 저장
        desserts[cafe_map[row][col]] = 1
        dessert_check(row, col, 1, 0) # 세 번째 인자 : 조건에 맞는 지금 까지 구한 디저트 개수, 네 번재 인자 : 90도 꺾는 횟수
        desserts[cafe_map[row][col]] = 0
    print('#{} {}'.format(tc + 1, result if result else -1))