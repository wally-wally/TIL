import sys
sys.stdin = open('input_5251.txt', 'r')

# Dijkstra 알고리즘
from collections import deque

def dijkstra(s):
    D[s] = 0
    visit = [False] * (V + 1)
    cnt = V + 1
    while cnt:
        u, MIN = 0, 0xffffff
        for i in range(V + 1):
            if not visit[i] and MIN > D[i]:
                u, MIN = i, D[i]
        visit[u] = True
        for v, w in G[u]:
            if D[v] > D[u] + w: 
                D[v] = D[u] + w
        cnt -= 1

for tc in range(int(input())):
    V, E = map(int, input().split())
    G = [[] for _ in range(V + 1)]
    for _ in range(E):
        u, v, w = map(int, input().split())
        G[u].append((v, w))

    D = [0xffffff] * (V + 1)

    dijkstra(0)

    print('#{} {}'.format(tc + 1, D[V]))