import sys
sys.stdin = open('input_4014.txt', 'r')

def check_count(r, c, v, x):
    ground_cnt = 0
    while True:
        if v != flight_map[r][c]:
            return []
        ground_cnt += 1
        if ground_cnt == x or c == 0: break
        c -= 1
    return [c]

def check_count2(r, c, v, x):
    ground_cnt = 0
    while True:
        if v != flight_map[r][c]:
            return []
        ground_cnt += 1
        if ground_cnt == x or c == N - 1: break
        c += 1
    return [c]


for tc in range(int(input())):
    N, X = map(int, input().split())
    flight_map = [list(map(int, input().split())) for _ in range(N)]

    result = 0

    # 가로 활주로 건설
    runway_map = [[0] * N for _ in range(N)]
    for row in range(N):
        col = 0
        value = flight_map[row][0]
        while True:
            col += 1
            if flight_map[row][col] - value == 1: # 올라갈 때
                check_val =  check_count(row, col - 1, value, X)
                if len(check_val):
                    for i in range(check_val[0], col):
                        runway_map[row][i] = 1
                else: break
            elif value - flight_map[row][col] == 1: # 내려갈 때
                check_val = check_count2(row, col + 1, value, X)
                if len(check_val):
                    for j in range(col, check_val[0] + 1):
                        runway_map[row][j] = 1
                else: break
            elif abs(flight_map[row][col] - value) >= 2:
                break
        if col == N:
            result += 1

    print('#{} {}'.format(tc + 1, result))