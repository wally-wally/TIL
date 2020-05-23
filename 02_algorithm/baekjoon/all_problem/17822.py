import sys
sys.stdin = open('input_17822.txt', 'r')

N, M, T = map(int, input().split())
circle_board = [list(map(int, input().split())) for _ in range(N)]
for _ in range(T):
    x, d, k = map(int, input().split())
    if not sum(map(sum, circle_board)): break

    # (1) x의 배수 번째 원판 회전
    for board_idx in range(x - 1, N, x):
        now_board = circle_board[board_idx]
        pop_numbers = now_board[M - k:] if not d else now_board[:k] # d == 0: 시계 방향, d == 1: 반시계 방향
        remain_numbers = now_board[:M - k] if not d else now_board[k:]
        circle_board[board_idx] = pop_numbers + remain_numbers if not d else remain_numbers + pop_numbers

    # (2) 인접하면서 같은 숫자 제거
    eliminate_idx = [] # 인접하면서 같은 숫자를 제거해서 0으로 만들기 위한 위치를 담은 배열
    # (2-1) 같은 원판 내에서 고려
    for row_idx in range(N):
        for col_idx in range(M):
            now_num = circle_board[row_idx][col_idx]
            if not now_num: continue
            left_idx, right_idx = col_idx - 1, col_idx + 1 if col_idx != M - 1 else 0
            left_num, right_num = circle_board[row_idx][left_idx], circle_board[row_idx][right_idx]
            if now_num == left_num:
                eliminate_idx.append([row_idx, left_idx])
                if [row_idx, col_idx] in eliminate_idx: continue
                eliminate_idx.append([row_idx, col_idx])
            if now_num == right_num:
                eliminate_idx.append([row_idx, right_idx])
                if [row_idx, col_idx] in eliminate_idx: continue
                eliminate_idx.append([row_idx, col_idx])
    # (2-2) 같은 라인에 있는 다른 원판들과 숫자 비교 고려
    for col_idx in range(M):
        for row_idx in range(N):
            now_num = circle_board[row_idx][col_idx]
            if not now_num: continue
            top_idx, bottom_idx = row_idx - 1, row_idx + 1
            if top_idx >= 0:
                if now_num == circle_board[top_idx][col_idx]:
                    eliminate_idx.append([top_idx, col_idx])
                    if [row_idx, col_idx] in eliminate_idx: continue
                    eliminate_idx.append([row_idx, col_idx])
            if bottom_idx < N:
                if now_num == circle_board[bottom_idx][col_idx]:
                    eliminate_idx.append([bottom_idx, col_idx])
                    if [row_idx, col_idx] in eliminate_idx: continue
                    eliminate_idx.append([row_idx, col_idx])
    # (2-3) 숫자 제거 => 제거된 숫자는 0으로 표시
    for idx in eliminate_idx:
        circle_board[idx[0]][idx[1]] = 0

    # (3) 만약 제거된 숫자가 없다면 평균에 따라 원판의 숫자 +1 또는 -1
    if len(eliminate_idx):
        eliminate_idx = [] # 메모리 확보를 위해 제거 인덱스를 빈 배열로 선언
        continue
    eliminate_idx = [] # 메모리 확보를 위해 제거 인덱스를 빈 배열로 선언
    sum_value, num_cnt = 0, 0
    check_num_idx = []
    for r_idx in range(N):
        sum_value += sum(circle_board[r_idx])
        for c_idx in range(M):
            if circle_board[r_idx][c_idx]:
                check_num_idx.append([r_idx, c_idx])
                num_cnt += 1
    num_avg = sum_value / num_cnt

    for idx in check_num_idx:
        if num_avg > circle_board[idx[0]][idx[1]]:
            circle_board[idx[0]][idx[1]] += 1
        elif num_avg < circle_board[idx[0]][idx[1]]:
            circle_board[idx[0]][idx[1]] -= 1
    
# (4) 원판에 적힌 숫자의 총합 계산
print(sum(map(sum, circle_board)))