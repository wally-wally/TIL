import sys
sys.stdin = open('input_14890.txt', 'r')

N, X = map(int, input().split())
map_info = [list(map(int, input().split())) for _ in range(N)]
answer = 0
slope_info = [['N'] * N for _ in range(N)]
# (1) 가로 방향 활주로 체크
for row in range(N):
    # (1-1) 모두 같은 높이 이면 통과
    if len(set(map_info[row])) == 1:
        answer += 1
        continue

    # (1-2) 두 칸씩 묶어서 계산하면서 높이 차이가 2 이상이면 더 이상 검사할 필요없이 다음 행 검사
    # (1-3) 두 칸씩 묶어서 계산하면서 높이 차이가 1인 경우 '현재 위치 높이 < 다음 위치 높이' &  '현재 위치 높이 > 다음 위치 높이' 두 가지 경우로 나눠서 연달아 같은 높이가 X개 배치되어 있는지 확인
    break_var = 1
    for col in range(N - 1):
        if abs(map_info[row][col] - map_info[row][col + 1]) >= 2:
            break_var = 0
            break
        if map_info[row][col] < map_info[row][col + 1]:
            if col + 1 - X < 0:
                break_var = 0
                break
            if map_info[row][col + 1 - X : col + 1] == [map_info[row][col]] * X:
                slopes = set(slope_info[row][col + 1 - X : col + 1])
                if len(slopes) == 1 and list(slopes)[0] == 'N':
                    for col_idx in range(col, col - X, -1):
                        slope_info[row][col_idx] = 'U'
                else:
                    break_var = 0
                    break
            else:
                break_var = 0
                break
        elif map_info[row][col] > map_info[row][col + 1]:
            if col + 1 + X > N:
                break_var = 0
                break
            if map_info[row][col + 1 : col + 1 + X] == [map_info[row][col + 1]] * X:
                slopes = set(slope_info[row][col + 1 : col + 1 + X])
                if len(slopes) == 1 and list(slopes)[0] == 'N':
                    for col_idx in range(col + 1, col + 1 + X):
                        slope_info[row][col_idx] = 'D'
                else:
                    break_var = 0
                    break
            else:
                break_var = 0
                break
    answer += break_var

slope_info = [['N'] * N for _ in range(N)]
# (2) 세로 방향 활주로 체크
for col in range(N):
    # (2-1) (1-1)과 동일
    if len(set(list(zip(*map_info))[col])) == 1:
        answer += 1
        continue

    # (2-2) (1-2)와 동일 / (2-3) (1-3)과 동일
    break_var = 1
    for row in range(N - 1):
        if abs(map_info[row][col] - map_info[row + 1][col]) >= 2:
            break_var = 0
            break
        if map_info[row][col] < map_info[row + 1][col]:
            if row + 1 - X < 0:
                break_var = 0
                break
            height_info = [map_info[i][col] for i in range(row + 1 - X, row + 1)]
            if height_info == [map_info[row][col]] * X:
                slopes = set([slope_info[j][col] for j in range(row + 1 - X, row + 1)])
                if len(slopes) == 1 and list(slopes)[0] == 'N':
                    for row_idx in range(row, row - X, -1):
                        slope_info[row_idx][col] = 'U'
                else:
                    break_var = 0
                    break
            else:
                break_var = 0
                break
        elif map_info[row][col] > map_info[row + 1][col]:
            if row + 1 + X > N:
                break_var = 0
                break
            height_info = [map_info[i][col] for i in range(row + 1, row + 1 + X)]
            if height_info == [map_info[row + 1][col]] * X:
                slopes = set([slope_info[j][col] for j in range(row + 1, row + 1 + X)])
                if len(slopes) == 1 and list(slopes)[0] == 'N':
                    for row_idx in range(row + 1, row + 1 + X):
                        slope_info[row_idx][col] = 'D'
                else:
                    break_var = 0
                    break
            else:
                break_var = 0
                break
    answer += break_var

print(answer)