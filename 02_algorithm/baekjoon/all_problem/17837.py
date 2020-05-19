import sys
sys.stdin = open('input_17837.txt', 'r')

def run_game():
    turn_number = 1
    move_able = 0
    while turn_number <= 1000:
        for knight_number in range(K):
            row, col, direction = knight_positions[knight_number]
            new_row, new_col = row + dx[direction], col + dy[direction]
            # 다음 칸이 게임판 밖으로 나가는 경우 or 이동하려는 칸이 파란색
            if new_row < 0 or new_row >= N or new_col < 0 or new_col >= N or ground[new_row][new_col] == 2:
                new_direction = change_direction[direction]
                new_row, new_col = row + dx[new_direction], col + dy[new_direction]
                if new_row < 0 or new_row >= N or new_col < 0 or new_col >= N or ground[new_row][new_col] == 2: # 방향이 바뀌어도 움직일 수 없는 경우
                    knight_positions[knight_number][2] = new_direction # 방향만 바뀌고
                    continue # 다른 말 체크하러 continue
                move_able = 1 # 방향 바뀌고 이동했을 때의 칸이 흰색 또는 빨간색
            # 이동하려는 칸이 흰색(0), 빨간색(1)
            if ground[new_row][new_col] in [0, 1]:
                knight_idx = game_board[row][col].index(knight_number + 1)
                left_knights = game_board[row][col][:knight_idx]
                right_knights = game_board[row][col][knight_idx:]
                game_board[row][col] = left_knights
                game_board[new_row][new_col].extend(right_knights if not ground[new_row][new_col] else reversed(right_knights))
                if len(game_board[new_row][new_col]) >= 4: # 한 칸에 4개 이상의 말이 모인 경우 게임 종료
                    return turn_number
                for knight in right_knights:
                    knight_positions[knight - 1][0], knight_positions[knight - 1][1] = new_row, new_col
                if move_able == 1:
                    knight_positions[knight_number][2] = new_direction
                    move_able = 0
        turn_number += 1
    return -1
                

N, K = map(int, input().split())
ground = [list(map(int, input().split())) for _ in range(N)] # 게임판
game_board = [[[] for _ in range(N)] for _ in range(N)] # 현재 말의 위치
knight_positions= [] # 각 말의 현재 위치, 이동방향
for knight_num in range(1, K + 1):
    r, c, direct = map(int, input().split())
    game_board[r - 1][c - 1].append(knight_num)
    knight_positions.append([r - 1, c - 1, direct - 1])

dx, dy = (0, 0, -1, 1), (1, -1, 0, 0)
change_direction = { 0: 1, 1: 0, 2: 3, 3: 2 }

print(run_game())