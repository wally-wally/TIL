import sys
sys.stdin = open('input_practice04.txt', 'r')

# 다익스트라 알고리즘
from collections import deque

V, E = map(int, input().split())
G = [[] for _ in range(V + 1)] # 1 ~ V
for _ in range(E):
    u, v, w = map(int, input().split())
    G[u].append((v, w))
    G[v].append((u, w))

D = [0xffffff] * (V + 1)

def dijkstra(s):
    D[s] = 0
    visit = [False] * (V + 1) # 최단 경로를 찾은 정점들과 아닌 정점들 구분
    cnt = V
    while cnt:
        u, MIN = 0, 0xffffff
        for i in range(1, V + 1): # D 값이 최소인 정점을 찾는다.
            if not visit[i] and MIN > D[i]:
                u, MIN = i, D[i]
        visit[u] = True
        for v, w in G[u]:
            if D[v] > D[u] + w: 
                D[v] = D[u] + w
        cnt -= 1

dijkstra(1)

print(D[1 : V + 1])