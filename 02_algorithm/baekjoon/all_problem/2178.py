import sys
sys.stdin = open('input.txt', 'r')

def BFS(start_x, start_y):
    dx, dy = [-1, 0, 1, 0], [0, 1, 0, -1]
    check = 0
    queue = []
    visited = [[0 for x in range(M)] for i in range(N)]
    queue.append([start_x, start_y])
    visited[start_x][start_y] = 1
    while True:
        if check:
            break
        t = queue.pop(0)
        for i in range(4):
            nX, nY = t[0] + dx[i], t[1] + dy[i]
            if 0 <= nX < N and 0 <= nY < M: # 다음으로 이동한 칸이 미로판 안에 있는가?
                if nX == N - 1 and nY == M - 1:
                    return visited[t[0]][t[1]] + 1
                elif visited[nX][nY] == 0 and miro[nX][nY] == 1:
                    queue.append([nX, nY])
                    visited[nX][nY] = visited[t[0]][t[1]] + 1


N, M = map(int, input().split())
miro = [[int(element) for element in input()] for _ in range(N)]
print(BFS(0, 0))