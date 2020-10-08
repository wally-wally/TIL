import sys
sys.stdin = open('input_13460.txt', 'r')

dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1) # 상-우-하-좌

# 같은 라인에 있고 구슬 사이에 뚫려있을 때 움직이는 구슬의 우선순위 선정
def check_priority(red, blue, dir):
    if dir == 0: # 상
        return 'r' if red[0] < blue[0] else 'b'
    elif dir == 1: # 우
        return 'r' if red[1] > blue[1] else 'b'
    elif dir == 2: # 하
        return 'r' if red[0] > blue[0] else 'b'
    else: # 좌
        return 'r' if red[1] < blue[1] else 'b' 


# 구슬 움직이기
def move_marble(red, blue, open, dir):
    move_available_red, move_available_blue = True, True
    goal_in_blue, goal_in_red = False, False
    new_blue, new_red = (0, 0), (0, 0)
    times = 1
    if not open: # 서로 겹치지 않을 때
        while move_available_red or move_available_blue:
            # 파란 공 체크
            if move_available_blue:
                new_blue_x, new_blue_y = blue[0] + dx[dir] * times, blue[1] + dy[dir] * times
                if game_board[new_blue_x][new_blue_y] == '#':
                    move_available_blue = False
                    new_blue = (blue[0] + dx[dir] * (times - 1), blue[1] + dy[dir] * (times - 1))
                elif new_blue_x == hole[0] and new_blue_y == hole[1]:
                    move_available_blue = False
                    goal_in_blue = True
                    new_blue = hole
            # 빨간 공 체크
            if move_available_red:
                new_red_x, new_red_y = red[0] + dx[dir] * times, red[1] + dy[dir] * times
                if game_board[new_red_x][new_red_y] == '#':
                    move_available_red = False
                    new_red = (red[0] + dx[dir] * (times - 1), red[1] + dy[dir] * (times - 1))
                elif new_red_x == hole[0] and new_red_y == hole[1]:
                    move_available_red = False
                    goal_in_red = True
                    new_red = hole
            times += 1
    else: # 서로 겹칠 때
        # 어떤 구슬이 더 우선순위 있는지 결정
        marble_priority = check_priority(red, blue, dir)
        stop_position = (0, 0)
        if marble_priority == 'b': # 파란 구슬이 더 높을 때
            while move_available_red or move_available_blue:
                # 파란 공 체크
                if move_available_blue:
                    new_blue_x, new_blue_y = blue[0] + dx[dir] * times, blue[1] + dy[dir] * times
                    if game_board[new_blue_x][new_blue_y] == '#':
                        move_available_blue = False
                        new_blue = (blue[0] + dx[dir] * (times - 1), blue[1] + dy[dir] * (times - 1))
                        stop_position = new_blue
                    elif new_blue_x == hole[0] and new_blue_y == hole[1]:
                        move_available_blue = False
                        goal_in_blue = True
                        new_blue = hole
                # 빨간 공 체크
                if move_available_red:
                    new_red_x, new_red_y = red[0] + dx[dir] * times, red[1] + dy[dir] * times
                    if game_board[new_red_x][new_red_y] == '#' or (new_red_x == stop_position[0] and new_red_y == stop_position[1]):
                        move_available_red = False
                        new_red = (red[0] + dx[dir] * (times - 1), red[1] + dy[dir] * (times - 1))
                    elif new_red_x == hole[0] and new_red_y == hole[1]:
                        move_available_red = False
                        goal_in_red = True
                        new_red = hole
                times += 1
        else: # 빨간 구슬이 더 높을 때
            while move_available_red or move_available_blue:
                # 빨간 공 체크
                if move_available_red:
                    new_red_x, new_red_y = red[0] + dx[dir] * times, red[1] + dy[dir] * times
                    if game_board[new_red_x][new_red_y] == '#':
                        move_available_red = False
                        new_red = (red[0] + dx[dir] * (times - 1), red[1] + dy[dir] * (times - 1))
                        stop_position = new_red
                    elif new_red_x == hole[0] and new_red_y == hole[1]:
                        move_available_red = False
                        goal_in_red = True
                        new_red = hole
                # 파란 공 체크
                if move_available_blue:
                    new_blue_x, new_blue_y = blue[0] + dx[dir] * times, blue[1] + dy[dir] * times
                    if game_board[new_blue_x][new_blue_y] == '#' or (new_blue_x == stop_position[0] and new_blue_y == stop_position[1]):
                        move_available_blue = False
                        new_blue = (blue[0] + dx[dir] * (times - 1), blue[1] + dy[dir] * (times - 1))
                    elif new_blue_x == hole[0] and new_blue_y == hole[1]:
                        move_available_blue = False
                        goal_in_blue = True
                        new_blue = hole
                times += 1
    return goal_in_blue, goal_in_red, new_blue, new_red


# 빨간 구슬과 파란 구슬이 같은 라인에 있으며 구슬 사이에 뚫려 있는지 확인
def check_same_line(red, blue, dir):
    if dir == 0:
        if red[1] == blue[1]:
            min_value, max_value = min(red[0], blue[0]), max(red[0], blue[0])
            for x in range(min_value + 1, max_value + 1):
                if game_board[x][red[1]] == '#':
                    return False
            else:
                return True
    else:
        if red[0] == blue[0]:
            min_value, max_value = min(red[1], blue[1]), max(red[1], blue[1])
            for y in range(min_value + 1, max_value + 1):
                if game_board[red[0]][y] == '#':
                    return False
            else:
                return True
    return False


def marble_DFS(new_red, new_blue, dir, temp_answer):
    global answer
    if temp_answer >= answer or temp_answer == 11:
        return
    for k in range(1, 4):
        new_k = (dir + k) % 4
        check_open = check_same_line(new_red, new_blue, new_k % 2)
        temp_blue_result, temp_red_result, new_blue_pos, new_red_pos = move_marble(new_red, new_blue, check_open, new_k)
        if not temp_blue_result and temp_red_result:
            answer = min(answer, temp_answer)
            return
        elif not temp_blue_result and not temp_red_result:
            marble_DFS(new_red_pos, new_blue_pos, new_k, temp_answer + 1)


N, M = map(int, input().split())
red_marble, blue_marble, hole = (0, 0), (0, 0), (0, 0)

# 1. 게임판 세팅 및 빨간 구슬, 파란 구슬, 구멍 위치 파악
game_board = []
for i in range(N):
    line = input()
    board_line = []
    for j in range(M):
        if line[j] == 'B':
            blue_marble = (i, j)
        elif line[j] == 'R':
            red_marble = (i, j)
        elif line[j] == 'O':
            hole = (i, j)
        board_line.append(line[j] if line[j] in ['#', '.', 'O'] else '.')
    game_board.append(board_line)

# 2. DFS 방식으로 각 방향으로 기울였을 때 움직이는 공의 위치 파악
# 상하 방향으로 기울일 때 각 구슬의 y 값 비교
# 좌우 방향으로 기울일 때 각 구슬의 x 값 비교
# 이 때 같은 라인에 있는 경우 구슬 사이에 벽이 있는지 체크
answer = 11
for i in range(4):
    check_open = check_same_line(red_marble, blue_marble, i % 2)
    temp_blue_result, temp_red_result, new_blue_pos, new_red_pos = move_marble(red_marble, blue_marble, check_open, i)
    if not temp_blue_result and temp_red_result:
        answer = 1
        break
    elif not temp_blue_result and not temp_red_result:
        marble_DFS(new_red_pos, new_blue_pos, i, 2)
print(answer if answer <= 10 else -1)