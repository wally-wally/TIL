import sys
sys.stdin = open('input.txt', 'r')

def DFS(v):
    visited[v] = True
    print(v, end = ' ')
    for w in sorted(G[v]):
        if not visited[w]:
            DFS(w)

def BFS(v):
    queue = []
    visited[v] = True
    print(v, end = ' ')
    queue.append(v)
    while queue:
        t = queue.pop(0)
        if not visited[t]:
            visited[t] = True
            print(t, end = ' ')
        for w in sorted(G[t]):
            if not visited[w]:
                queue.append(w)


for _ in range(3):
    N, M, V = map(int, input().split())
    G = [[] for _ in range(N + 1)]

    for __ in range(M):
        u, v = map(int, input().split())
        G[u].append(v)
        G[v].append(u)
    visited = [False] * (N + 1)
    DFS(V)
    print()
    visited = [False] * (N + 1)
    BFS(V)
    print()