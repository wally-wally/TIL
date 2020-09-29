def solution(n, results):
    answer = 0
    
    checked = [[0xffffff for _ in range(n)] for _ in range(n)]
    
    for i in range(n):
        checked[i][i] = 0
    
    for result in results:
        a, b = result
        checked[a - 1][b - 1] = 1
        
    for node in range(n): # 거쳐가는 노드
        for start in range(n): # 시작 노드
            for finish in range(n): # 도착 노드
                if checked[start][node] + checked[node][finish] < checked[start][finish]:
                    checked[start][finish] = checked[start][node] + checked[node][finish]
    
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            if checked[i][j] == 0xffffff and checked[j][i] == 0xffffff:
                break
        else:
            answer += 1
    
    return answer


print(solution(5, 	[[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]])) # 2