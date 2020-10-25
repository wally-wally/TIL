import sys
sys.stdin = open('input_1967.txt', 'r')

from collections import deque

def find_farthest_vertex(start_node):
    distance, farthest_vertex = 0, start_node
    dq = deque()
    dq.append((start_node, 0))
    visited = [False for _ in range(n + 1)]
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


n = int(input())
if n == 1:
    print(0)
else:
    tree_info = dict()
    for _ in range(n - 1):
        node1, node2, dist = map(int, input().split())
        if node1 not in tree_info:
            tree_info[node1] = dict()
        tree_info[node1][node2] = dist
        if node2 not in tree_info:
            tree_info[node2] = dict()
        tree_info[node2][node1] = dist

    temp_vertex = find_farthest_vertex(1)[1]
    distance = find_farthest_vertex(temp_vertex)[0]
    print(distance)