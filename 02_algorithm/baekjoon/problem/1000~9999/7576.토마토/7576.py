import sys
sys.stdin = open('input_7576.txt', 'r')

def BFS():
    queue = []
    direction = [(-1, 0), (0, +1), (+1, 0), (0, -1)]
    complete_tomato_cnt, day = 0, 0
    for element in tomato_position:
        queue.append(element)
        visited[element[0]][element[1]] = True
        complete_tomato_cnt += 1
    while True:
        day += 1
        temp_list = []
        for elem in queue:
            pop_element = elem
            visited[pop_element[0]][pop_element[1]] = True
            for idx in range(4):
                new_N, new_M = pop_element[0] + direction[idx][0], pop_element[1] + direction[idx][1]
                if 0 <= new_N < N and 0 <= new_M < M:
                    if arr[new_N][new_M] == 0 and not visited[new_N][new_M]:
                        arr[new_N][new_M] = 1
                        complete_tomato_cnt += 1
                        temp_list.append([new_N, new_M])
                    visited[new_N][new_M] = True
        queue = []
        if not len(temp_list):
            if complete_tomato_cnt != tomato_cnt:
                return -1
            elif complete_tomato_cnt == tomato_cnt:
                return day - 1
        else:
            for temp in temp_list:
                queue.append(temp)


M, N = map(int, input().split())
not_grown_tomato, grown_tomato, empty_cnt = 0, 0, 0
tomato_position, empty_position = [], []
arr = []
for a in range(N):
    line = list(map(int, input().split()))
    arr.append(line)
    for b in range(M):
        if line[b] == 1:
            grown_tomato += 1
            tomato_position.append([a, b])
        elif line[b] == 0:
            not_grown_tomato += 1
        else:
            empty_position.append([a, b])
            empty_cnt + 1
if grown_tomato == 0:
    print(-1)
elif grown_tomato + empty_cnt == N * M:
    print(0)
else:
    tomato_cnt = not_grown_tomato + grown_tomato
    visited = [[False] * M for _ in range(N)]
    for empty in empty_position:
        visited[empty[0]][empty[1]] = True
    print(BFS())