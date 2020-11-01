import sys
sys.stdin = open('input.txt', 'r')
sys.setrecursionlimit(10000)

def DFS(x):
    visited[x] = True
    for w in sorted(G[x]):
        if visited[w] == False:
            DFS(w)

for _ in range(3):
    N, M = map(int, sys.stdin.readline().split())
    G = [[] for _ in range(N + 1)]

    for __ in range(M):
        u, v = map(int, sys.stdin.readline().split())
        G[u].append(v)
        G[v].append(u)
    visited = [False] * (N + 1)

    element_count = 0
    for i in range(1, N + 1):
        if visited[i] == False:
            DFS(i)
            element_count += 1
    print(element_count)
    
# https://rebas.kr/653
# Python을 통해 재귀 방식의 DFS로 짜면 재귀 제한에 걸려 런타임 에러(Runtime Error)를 받게 된다.
# 스택으로 바꿔서 구현하거나, sys.setrecursionlimit를 통해 재귀 제한 범위를 늘리면 된다.