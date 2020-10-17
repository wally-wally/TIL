from collections import deque

def find_tree_diameter(vertax, start_node, n):
    distance_info = []
    dq = deque()
    dq.append([start_node, 0])
    visited = [0 for _ in range(n + 1)]
    visited[start_node] = 1

    while dq:
        now_node, now_distance = dq.popleft()
        distance_info.append([now_node, now_distance])
        if now_node not in vertax:
            continue
        for node in vertax[now_node]:
            if not visited[node]:
                dq.append([node, now_distance + 1])
                visited[node] = 1

    return distance_info


def solution(n, edges):
    vertax = dict()
    for edge in edges:
        e1, e2 = edge
        if e1 not in vertax:
            vertax[e1] = [e2]
        else:
            vertax[e1].append(e2)
        if e2 not in vertax:
            vertax[e2] = [e1]
        else:
            vertax[e2].append(e1)
    
    p1 = find_tree_diameter(vertax, 1, n)
    p2 = find_tree_diameter(vertax, p1[-1][0], n)

    # 시작 정점을 기준으로 각 노드까지의 거리를 구했을 때 최댓값이 여러 개 일 때
    if p1[-2][1] == p1[-1][1]:
        return p2[-1][1] 
    # 시작 정점을 기준으로 각 노드까지의 거리를 구했을 때 최댓값이 한 개일 때
    else:
        return p2[-2][1]
        

print(solution(4, [[1,2],[2,3],[3,4]])) # 2
print(solution(5, [[1,5],[2,5],[3,5],[4,5]])) # 2
print(solution(6, [[1,4],[6,3],[2,3],[5,3],[3,4]])) # 3
# 참고: https://nam-ki-bok.github.io/quiz/Quiz_TrioTree/