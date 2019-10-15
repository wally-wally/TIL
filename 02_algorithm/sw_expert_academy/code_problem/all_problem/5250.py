import sys
sys.stdin = open('input_5250.txt', 'r')

from collections import deque

def check_cost():
    queue = deque()
    queue.append((0, 0))
    check_arr[0][0] = 0
    while queue:
        x, y = queue.popleft()
        for direct in [(-1, 0), (0, +1), (+1, 0), (0, -1)]:
            new_x, new_y = x + direct[0], y + direct[1]
            if 0 <= new_x < N and 0 <= new_y < N:
                w = arr[new_x][new_y] - arr[x][y] + 1 if arr[new_x][new_y] > arr[x][y] else 1
                # 간선 완화 부분
                if check_arr[new_x][new_y] > check_arr[x][y] + w:
                    check_arr[new_x][new_y] = check_arr[x][y] + w
                    queue.append((new_x, new_y))
    return check_arr[N - 1][N - 1]

for tc in range(int(input())):
    N = int(input())
    check_arr = [[0xffffff] * N for _ in range(N)]
    arr = [list(map(int, input().split())) for _ in range(N)]
    print('#{} {}'.format(tc + 1, check_cost()))