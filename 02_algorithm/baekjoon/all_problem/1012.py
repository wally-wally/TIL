import sys
sys.stdin = open('input_1012.txt', 'r')

def BFS(x_point, y_point):
    queue = [[x_point, y_point]]
    direction = [(-1, 0), (0, +1), (+1, 0), (0, -1)]
    while True:
        temp_list = []
        for elem in queue:
            pop_element = elem
            visited[pop_element[0]][pop_element[1]] = True
            for i in range(4):
                new_x, new_y = pop_element[0] + direction[i][0], pop_element[1] + direction[i][1]
                if 0 <= new_x < N and 0 <= new_y < M:
                    if arr[new_x][new_y] and not visited[new_x][new_y]:
                        temp_list.append([new_x, new_y])
                    visited[new_x][new_y] = True
        queue = []
        if len(temp_list):
            for temp in temp_list:
                queue.append(temp)
        else:
            return



for tc in range(int(input())):
    M, N, K = map(int, input().split())
    arr = []
    for a in range(N):
        element = []
        for b in range(M):
            element.append(0)
        arr.append(element)
    for _ in range(K):
        c, r = map(int, input().split())
        arr[r][c] = 1
    visited = [[0 for __ in range(M)] for ___ in range(N)]
    result = 0
    for x in range(N):
        for y in range(M):
            if arr[x][y] and not visited[x][y]:
                visited[x][y] = 1
                BFS(x, y)
                result += 1
    print(result)