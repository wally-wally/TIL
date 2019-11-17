import sys
sys.stdin = open('input_14503.txt', 'r')

from collections import deque

dx, dy = (0, 1, 0, -1), (-1, 0, 1, 0)
N, M = map(int, input().split())
r, c, d = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

clean_area = 0

queue = deque()
queue.append((r, c, d))
while queue:
    elem = queue.popleft()
    if arr[elem[0]][elem[1]] == 0:
        arr[elem[0]][elem[1]] = 2
        clean_area += 1
    
    if arr[elem[0] - 1][elem[1]] >= 1 and arr[elem[0] + 1][elem[1]] >= 1 and arr[elem[0]][elem[1] - 1] >= 1 and arr[elem[0]][elem[1] + 1] >= 1:
        if elem[2] == 0:
            if arr[elem[0] + 1][elem[1]] == 1:
                break
            elif arr[elem[0] + 1][elem[1]] == 2:
                queue.append((elem[0] + 1, elem[1], 0))
                continue
        elif elem[2] == 1:
            if arr[elem[0]][elem[1] - 1] == 1:
                break
            elif arr[elem[0]][elem[1] - 1] == 2:
                queue.append((elem[0], elem[1] - 1, 1))
                continue
        elif elem[2] == 2:
            if arr[elem[0] - 1][elem[1]] == 1:
                break
            elif arr[elem[0] - 1][elem[1]] == 2:
                queue.append((elem[0] - 1, elem[1], 2))
                continue
        elif elem[2] == 3:
            if arr[elem[0]][elem[1] + 1] == 1:
                break
            elif arr[elem[0]][elem[1] + 1] == 2:
                queue.append((elem[0], elem[1] + 1, 3))
                continue
            
    if elem[2] == 0:
        check_direction_idx = [0, 1, 2, 3]
    elif elem[2] == 1:
        check_direction_idx = [3, 0, 1, 2]
    elif elem[2] == 2:
        check_direction_idx = [2, 3, 0, 1]
    else:
        check_direction_idx = [1, 2, 3, 0]
    for k in check_direction_idx:
        new_r, new_c = elem[0] + dx[k], elem[1] + dy[k]
        if 1 <= new_r <= N - 2 and 1 <= new_c <= M - 2:
            if arr[new_r][new_c] == 0:
                queue.append((new_r, new_c, 3 - k))
                break

print(clean_area)