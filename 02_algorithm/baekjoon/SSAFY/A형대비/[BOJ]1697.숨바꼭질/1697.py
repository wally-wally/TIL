import sys
sys.stdin = open('input_1697.txt', 'r')

from collections import deque

N, K = map(int,input().split())
Max = 100000
visited = [-1] * 100001
visited[N] = 0
q = deque()
q.append(N)
while q:
    x = q.popleft()
    for nx in [x - 1, x + 1, 2 * x]:
        if 0<= nx <=100000 and visited[nx]==-1:
            q.append(nx)
            visited[nx] = visited[x]+1
print(visited[K])