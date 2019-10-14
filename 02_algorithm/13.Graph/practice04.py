import sys
sys.stdin = open('input_practice04.txt', 'r')

from collections import deque

V, E = map(int, input().split())
G = [[] for _ in range(V + 1)] # 1 ~ V
for _ in range(E):
    u, v, w = map(int, input().split())
    G[u].append((v, w))
    G[v].append((u, w))

# [아주 중요!] D[] 배열 초기값을 매우 큰 값으로 설정
# (매우 큰 값 = 출발점에서 특정 정점으로 어떤 경로도 발견하지 못함을 의미)
D = [0xffffff] * (V + 1)

def BFS(s):
    Q = deque()
    D[s] = 0
    Q.append(s)
    while Q:
        u = Q.popleft()
        for v, w in G[u]:
            if D[v] > D[u] + w: # 바뀌면 Q에 바로 넣는다.
                D[v] = D[u] + w
                Q.append(v)

BFS(1)

print(D[1:])