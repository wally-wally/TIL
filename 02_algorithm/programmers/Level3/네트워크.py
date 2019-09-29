def solution(n, computers):
    answer = 0
    visited = [False] * n
    for i in range(n):
        if not visited[i]:
            def DFS(num):
                for idx in range(n):
                    if not visited[idx] and idx != num:
                        if computers[num][idx]:
                            visited[idx] = True
                            DFS(idx)
            visited[i] = True
            DFS(i)
            answer += 1
    return answer

print(solution(3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]]))
print(solution(3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]])