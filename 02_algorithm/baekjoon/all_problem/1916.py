import sys
sys.stdin = open('input_1916.txt', 'r')

N = int(input())
M = int(input())
G = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v, w = map(int, input().split())
    G[u].append((v, w))
s, e = map(int, input().split())

def dijkstra(start):
    D[s] = 0
    visit = [False] * (N + 1)
    cnt = N
    while cnt:
        u, MIN = 0, 0xfffffff
        for i in range(1, N + 1):
            if not visit[i] and MIN > D[i]:
                u, MIN = i, D[i]
        visit[u] = True
        for v, w in G[u]:
            if D[v] > D[u] + w: 
                D[v] = D[u] + w
        cnt -= 1

D = [0xfffffff] * (N + 1)
dijkstra(s)

print(D[e])