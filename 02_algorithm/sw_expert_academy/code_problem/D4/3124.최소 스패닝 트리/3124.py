import sys
sys.stdin = open('input_3124.txt', 'r')

for tc in range(int(input())):
    V, E = map(int, input().split())
    Edge = [tuple(map(int, input().split())) for _ in range(E)]

    Edge.sort(key=lambda x: x[2])

    p = [x for x in range(V + 1)]
    def find_set(x):
        if x != p[x]:
            p[x] = find_set(p[x])
        return p[x]

    # V - 1 개의 간선을 선택
    MST = []
    cur = 0
    while len(MST) < V - 1:
        u, v, w = Edge[cur]
        a = find_set(u); b = find_set(v)
        if a != b:
            p[b] = a
            MST.append((u, v, w))
        cur += 1

    answer = 0
    for e in MST:
        answer += e[2]
    
    print('#{} {}'.format(tc + 1, answer))