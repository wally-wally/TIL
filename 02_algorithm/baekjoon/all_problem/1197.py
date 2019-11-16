import sys
sys.stdin = open('input_1197.txt', 'r')

# Kruskal 알고리즘
V, E = map(int, input().split())

EDGE = [tuple(map(int, input().split())) for _ in range(E)]

EDGE.sort(key=lambda x : x[2])

p = [x for x in range(V + 1)]
def find_set(x):
    if x != p[x]:
        p[x] = find_set(p[x])
    return p[x]

MST, cur_idx = 0, 0
check_count = 0
while check_count < V - 1:
    u, v, w = EDGE[cur_idx]
    a = find_set(u); b = find_set(v)
    if a != b:
        p[b] = a
        MST += w
        check_count += 1
    cur_idx += 1

print(MST)