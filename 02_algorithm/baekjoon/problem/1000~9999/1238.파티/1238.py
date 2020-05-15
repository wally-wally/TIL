import sys
sys.stdin = open('input_1238.txt', 'r')

from collections import deque

N, M, X = map(int, input().split())
# 간선 정보 저장
G = [[] for _ in range(N + 1)] # 정방향
H = [[] for _ in range(N + 1)] # 역방향
for _ in range(M):
    u, v, w = map(int, input().split())
    G[u].append((v, w))
    H[v].append((u, w))

def dijkstra(s, d):
    D[s] = 0
    visit = [False] * (N + 1) # 최단 경로를 찾은 정점들과 아닌 정점들 구분
    cnt = N
    while cnt:
        u, MIN = 0, 0xfffff
        for i in range(1, N + 1): # D 값이 최소인 정점을 찾는다.
            if not visit[i] and MIN > D[i]:
                u, MIN = i, D[i]
        visit[u] = True
        graph = G if not d else H
        for v, w in graph[u]:
            if D[v] > D[u] + w: 
                D[v] = D[u] + w
        cnt -= 1

times = []
for idx in range(2):
    D = [0xfffff] * (N + 1)
    # (idx == 0) X번 마을을 출발점으로 할 때 각 마을까리 걸리는 시간
    # (idx == 1) 각 마을에서 X번 마을로 갈 때 걸리는 시간
    dijkstra(X, idx)
    times.append(D[1:])

answer = 0
for idx in range(N):
    answer = max(answer, times[0][idx] + times[1][idx])
print(answer)