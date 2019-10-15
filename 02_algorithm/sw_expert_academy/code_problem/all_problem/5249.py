import sys
sys.stdin = open('input_5249.txt', 'r')

# Kruskal 알고리즘
for tc in range(int(input())):
    V, E = map(int, input().split())

    Edge = []
    for _ in range(E):
        Edge.append(tuple(map(int, input().split())))

    Edge.sort(key=lambda x: x[2])

    p = [x for x in range(V + 1)]
    def find_set(x):
        if x != p[x]:
            p[x] = find_set(p[x])
        return p[x]

    MST = []
    cur = 0
    while len(MST) < V:
        u, v, w = Edge[cur]
        a = find_set(u); b = find_set(v)
        if a != b:
            p[b] = a
            MST.append((u, v, w))
        cur += 1

    result = 0
    for edge in MST:
        result += edge[2]
    print('#{} {}'.format(tc + 1, result))