import sys
sys.stdin = open('input_1167.txt', 'r')

from collections import deque

def find_farthest_vertex(start_node):
    distance, farthest_vertex = 0, start_node
    dq = deque()
    dq.append((start_node, 0))
    visited = [False for _ in range(V + 1)]
    visited[start_node] = True
    while dq:
        pop_node, pop_dist = dq.popleft()
        for node in tree_info[pop_node]:
            if not visited[node]:
                visited[node] = True
                now_dist = tree_info[pop_node][node]
                dq.append((node, pop_dist + now_dist))
                if distance < pop_dist + now_dist:
                    distance = pop_dist + now_dist
                    farthest_vertex = node
    return distance, farthest_vertex


V = int(input())
tree_info = dict()
for _ in range(V):
    vertex_info = list(map(int, input().split()))[:-1]
    criteria_vertex= vertex_info[0]
    for i in range(1, len(vertex_info), 2):
        if criteria_vertex not in tree_info:
            tree_info[criteria_vertex] = dict()
        tree_info[criteria_vertex][vertex_info[i]] = vertex_info[i + 1]

temp_vertex = find_farthest_vertex(1)[1]
distance = find_farthest_vertex(temp_vertex)[0]
print(distance)