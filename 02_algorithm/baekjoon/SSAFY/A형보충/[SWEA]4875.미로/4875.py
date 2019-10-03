import sys
sys.stdin = open('input_4875.txt', 'r')

def DFS(s, e):
    global result
    visited[s][e] = 1
    if s == end[0] and e == end[1]:
        result = 1
        return
    else:
        for direction in [(0, -1), (-1, 0), (0, 1), (1, 0)]:
            new_s, new_e = s + direction[0], e + direction[1]
            if 0 <= new_s < N and 0 <= new_e < N:
                if not visited[new_s][new_e] and arr[new_s][new_e] != 1:
                    DFS(new_s, new_e)
    return

for tc in range(int(input())):
    N = int(input())
    start, end = [0, 0], [0, 0]
    visited = [[0] * N for _ in range(N)]
    result = 0
    arr = []
    for x in range(N):
        line = []
        y = 0
        for num in input():
            if num == '2':
                start = [x, y]
            elif num == '3':
                end = [x, y]
            line.append(int(num))
            y += 1
        arr.append(line)
    DFS(start[0], start[1])
    print('#{} {}'.format(tc + 1, result))