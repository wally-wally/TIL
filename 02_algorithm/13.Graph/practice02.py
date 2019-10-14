import sys
sys.stdin = open('input_practice02.txt', 'r')

# Kruskal 알고리즘
V, E = map(int, input().split())

Edge = []
for _ in range(E):
    Edge.append(tuple(map(int, input().split())))

Edge.sort(key=lambda x: x[2])
# disjoint-set(cycle이 생기면 안되므로 cycle을 판단하기 위해 disjoint-set을 사용)
p = [x for x in range(V)]
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

for edge in MST:
    print(edge)