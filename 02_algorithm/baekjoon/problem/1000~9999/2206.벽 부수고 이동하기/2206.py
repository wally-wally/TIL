import sys
sys.stdin = open('input_2206.txt', 'r')

from collections import deque

dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)

def BFS():
    dq = deque()
    dq.append((0, 0, 0))
    checked[0][0][0] = 1
    while dq:
        r, c, wall_break = dq.popleft()
        if r == N - 1 and c == M - 1:
            return checked[r][c][wall_break]
        for i in range(4):
            new_r, new_c = r + dx[i], c + dy[i]
            if 0 <= new_r < N and 0 <= new_c < M:
                if checked[new_r][new_c][wall_break] == 0:
                    # 이동하려는 칸이 벽이 아닌 경우
                    if route[new_r][new_c] == 0:
                        checked[new_r][new_c][wall_break] = checked[r][c][wall_break] + 1
                        dq.append((new_r, new_c, wall_break))
                    # 이동하려는 칸이 벽이지만 이전까지 한 번도 벽을 안 부순 경우
                    if route[new_r][new_c] == 1 and wall_break == 0:
                        checked[new_r][new_c][1] = checked[r][c][wall_break] + 1
                        dq.append((new_r, new_c, 1))
    return -1 # 도착 지점까지 갈 수 없는 경우

N, M = map(int, input().split())
route = [[int(cell) for cell in input()] for _ in range(N)]
checked = [[[0, 0] for _ in range(M)] for _ in range(N)] # [벽을 안 부쉈을 때, 벽을 한 번 부쉈을 때]

print(BFS())