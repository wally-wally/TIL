import sys
sys.stdin = open('input_7562.txt', 'r')

def BFS(row, col):
    queue = []
    dx = [-2, -1, +1, +2, +2, +1, -1, -2]
    dy = [+1, +2, +2, +1, -1, -2, -2, -1]
    queue.append([row, col])
    visited[row][col] = True
    move_cnt = 0
    while True:
        temp_list = []
        move_cnt += 1
        while len(queue) != 0:
            element = queue.pop(0)
            for idx in range(8):
                new_row, new_col = element[0] + dx[idx], element[1] + dy[idx]
                if 0 <= new_row < I and 0 <= new_col < I:
                    if not visited[new_row][new_col]:
                        if new_row == goal[0] and new_col == goal[1]:
                            return move_cnt
                        else:
                            visited[new_row][new_col] = True
                            temp_list.append([new_row, new_col])
        for temp in temp_list:
            queue.append(temp)

for _ in range(int(input())):
    I = int(input())
    start = list(map(int, input().split()))
    goal = list(map(int, input().split()))
    visited = [[False] * I for _ in range(I)]
    if start == goal:
        print(0)
    else:
        print(BFS(start[0], start[1]))