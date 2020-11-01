import sys
sys.stdin = open('input_17265.txt', 'r')

dx, dy = (0, 1), (1, 0) # 오른쪽, 아래

def calc_expression(expression):
    calc_value = int(expression[0])
    for i in range(1, len(expression), 2):
        if expression[i] == '+':
            calc_value += int(expression[i + 1])
        elif expression[i] == '-':
            calc_value -= int(expression[i + 1])
        else:
            calc_value *= int(expression[i + 1])
    return calc_value


def make_expression_DFS(r, c, expression, values):
    if r == N - 1 and c == N - 1:
        values.append(calc_expression(expression))
        return values
    for i in range(2):
        new_r, new_c = r + dx[i], c + dy[i]
        if 0 <= new_r < N and 0 <= new_c < N:
            values = make_expression_DFS(new_r, new_c, expression + board[new_r][new_c], values)
    return values


N = int(input())
board = [input().split() for _ in range(N)]
values = make_expression_DFS(0, 0, board[0][0], [])
print(max(values), min(values))