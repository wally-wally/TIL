import sys
sys.stdin = open('input_2583.txt', 'r')

def paper_BFS(r, c):
    square = 1
    queue = [(r, c)]
    while queue:
        pop_cell = queue.pop(0)
        paper[pop_cell[0]][pop_cell[1]] = 1
        for i in range(4):
            new_row, new_col = pop_cell[0] + dx[i], pop_cell[1] + dy[i]
            if 0 <= new_row < M and 0 <= new_col < N:
                if paper[new_row][new_col] == 0:
                    queue.append((new_row, new_col))
                    paper[new_row][new_col] = 1
                    square += 1
    return square


M, N, K = map(int, input().split())
paper = [[0] * N for _ in range(M)]
for _ in range(K):
    y1, x1, y2, x2 = map(int, input().split())
    for x in range(x1, x2):
        for y in range(y1, y2):
            paper[M - 1 if x == M else x][N - 1 if y == N else y] = 1

dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)
answer = []
for idx in range(M * N):
    row, col = idx // N, idx % N
    if paper[row][col] == 0:
        answer.append(paper_BFS(row, col))
        
print(len(answer))
print(' '.join(map(str, sorted(answer))))