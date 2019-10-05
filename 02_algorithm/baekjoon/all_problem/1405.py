import sys
sys.stdin = open('input_1405.txt', 'r')

def mad_robot(r, c, cnt, res):
    global result
    if cnt == N:
        result += res
        return
    robot_board[r][c] = 1
    direction = [(0, 1), (0, -1), (+1, 0), (-1, 0)]
    for idx in range(4):
        new_r, new_c = r + direction[idx][0], c + direction[idx][1]
        if not robot_board[new_r][new_c]:
            mad_robot(new_r, new_c, cnt + 1, res * prob_list[idx])
    robot_board[r][c] = 0


info = list(map(int, input().split()))
N, move_prob = info[0], info[1:5]
prob_list = [value/100 for value in info[1:5]]
robot_board = [[0] * 30 for _ in range(30)]
result = 0
mad_robot(15, 15, 0, 1)
print('%.10lf' % result)