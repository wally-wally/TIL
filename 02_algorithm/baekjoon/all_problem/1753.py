import sys
sys.stdin = open('input_1753.txt', 'r')

# pypy3 제출
V, E = map(int, input().split())
K = int(input())

G = [[] for _ in range(V + 1)]
for _ in range(E):
    u, v, w = map(int, input().split())
    G[u].append((v, w))

D = [0xffffff] * (V + 1)

def dijkstra(s):
    D[s] = 0
    visited = [0] * (V + 1) # 최단 경로를 찾은 정점들과 아닌 정점들 구분
    cnt = V
    while cnt:
        u, MIN = 0, 0xffffff
        for i in range(1, V + 1): # D 값이 최소인 정점을 찾는다.
            if not visited[i] and MIN > D[i]:
                u, MIN = i, D[i]
        visited[u] = 1
        for v, w in G[u]:
            if D[v] > D[u] + w:
                D[v] = D[u] + w
        cnt -= 1

dijkstra(K)

for result in D[1:]:
    print("INF" if result == 0xffffff else result)