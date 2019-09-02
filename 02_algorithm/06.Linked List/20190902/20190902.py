import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    N = int(input())
    lines = [list(map(int, input().split())) for _ in range(N)]
    P = int(input())
    visited = [0 for _ in range(5001)]
    for line in lines:
        for i in range(line[0], line[1] + 1):
            visited[i] += 1
    print('#{} '.format(a + 1), end='')
    for i in range(P):
        print(visited[int(input())], end=' ')
    print()