import sys
sys.stdin = open('input_17471.txt', 'r')

def DFS(n, group, c): # DFS로 각 선거구가 연결되어 있는지 확인
    global cnt
    cnt += 1
    visited[n] = True
    for connect in connection_info[n]:
        if connect in group and not visited[connect]:
            DFS(connect, group, cnt)
    return True if cnt == len(group) else False

import itertools
N = int(input())
people_list = list(map(int, input().split()))
connection_info = [[] for _ in range(N + 1)] # 각 노드별 연결된 노드를 저장
idx_list = [n for n in range(1, N + 1)] # 조합으로 각 노드 번호를 뽑아내기 위해 만든 숫자 리스트
result = 10000 # 결과값

for i in range(1, N + 1):
    data = list(map(int, input().split()))
    for j in range(data[0]):
        connection_info[i].append(data[j + 1])

for k in range(1, N):
    for group in itertools.combinations(idx_list, k):
        visited = [False] * (N + 1)
        group_a = list(group) # ex) N = 7, group_a = [1, 4, 5, 7]
        group_b = list(set(idx_list) - set(group_a)) # ex) group_b = [2, 3, 6]

        cnt = 0
        DFS_result_a = DFS(group_a[0], group_a, cnt)

        if not DFS_result_a: continue # 첫 번째 선거구 group_a의 모든 노드가 연결되어 있지 않으면 group_b는 할 필요 없으므로 continue 구문에 의해 다시 처음으로

        cnt = 0
        DFS_result_b = DFS(group_b[0], group_b, cnt)

        if DFS_result_b: # group_b의 모든 노드가 연결되어 있다면 group_a, group_b의 각 선거구의 인구수 합 계산
            a_Sum_value, b_Sum_value = 0, 0
            for a in group_a:
                a_Sum_value += people_list[a - 1]
            for b in group_b:
                b_Sum_value += people_list[b - 1]
            if abs(a_Sum_value - b_Sum_value) <= result:
                result = abs(a_Sum_value - b_Sum_value)

if result == 10000: # 모든 조합의 경우를 다 했는데도 조건에 맞게 선거구로 나눌 수 없는 경우 즉, 처음 설정한 result 값 (10000)이 그대로이면 -1 출력
    result = -1
print(result)