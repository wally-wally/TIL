import sys
sys.stdin = open('input_1865.txt', 'r')

def probability(people_num, val):
    global ans, N
    if val <= ans:
        return
    if people_num == N:
        if val >= ans:
            ans = val
            return
    for i in range(N):
        if not used[i]:
            used[i] = True
            probability(people_num + 1, val * (arr[people_num][i] / 100))
            used[i] = False

for test_case in range(int(input())):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    number_list = [num for num in range(N)]
    used = [False] * N
    people_n, ans = 0, 0
    probability_value = 1 # 재귀 함수를 통해 계속 곱해질 확률 값이므로 1로 초기값 선언
    probability(people_n, probability_value)
    print('#{} {:.6f}'.format(test_case + 1, ans * 100))