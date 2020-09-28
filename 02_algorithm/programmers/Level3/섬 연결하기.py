def solution(n, costs):
    answer = 0
    costs.sort(key = lambda x: x[2])
    p = [x for x in range(n)]

    def find_set(x):
        if x != p[x]:
            p[x] = find_set(p[x])
        return p[x]

    MST = []
    cur = 0
    while len(MST) < n - 1:
        u, v, w = costs[cur]
        a = find_set(u)
        b = find_set(v)
        if a != b:
            p[b] = a
            MST.append([u, v, w])
        cur += 1
    
    for edge in MST:
        answer += edge[2]

    return answer


print(solution(4, [[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]])) # 4