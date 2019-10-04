import sys
sys.stdin = open('input_1210.txt', 'r')

def DFS(r, c):
    arr[r][c] = 0
    if r == 0:
        return c
    if c - 1 >= 0 and arr[r][c - 1]:
        return DFS(r, c - 1)
    elif c + 1 < 100 and arr[r][c + 1]:
        return DFS(r, c + 1)
    else:
        return DFS(r - 1, c)

for t in range(10):
    tc = int(input())
    arr = [list(map(int, input().split())) for _ in range(100)]
    for start in range(100):
        if arr[99][start] == 2:
            print('#{} {}'.format(tc, DFS(99, start)))
            break