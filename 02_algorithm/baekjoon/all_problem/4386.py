import sys
sys.stdin = open('input_4386.txt', 'r')

import math

vertex, edge = [], []

n = int(input())
for _ in range(n):
    x, y = map(float, input().split())
    vertex.append((x, y))

for i in range(n):
    for j in range(i + 1, n):
        x1, y1 = vertex[i]
        x2, y2 = vertex[j]
        dist = round(math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2), 2)
        edge.append((i, j, dist))

edge.sort(key=lambda x: x[2])

p = [x for x in range(n)]

def find_set(x):
    if x != p[x]:
        p[x] = find_set(p[x])
    return p[x]

MST = []
cur = 0
while len(MST) < n - 1:
    u, v, w = edge[cur]
    a = find_set(u)
    b = find_set(v)
    if a != b:
        p[b] = a
        MST.append((u, v, w))
    cur += 1

print(sum(map(lambda x: x[2], MST)))