import sys
sys.stdin = open('input_3282.txt', 'r')

def Knapsack(k, v_lst, c_lst, n):
    for i in range(1, n + 1):
        for j in range(1, k + 1):
            if v_lst[i - 1] <= j:
                DP[i][j] = max(c_lst[i - 1] + DP[i - 1][j - v_lst[i - 1]], DP[i - 1][j])
            else:
                DP[i][j] = DP[i - 1][j]
    return DP[n][k]

for tc in range(int(input())):
    N, K = map(int, input().split())
    DP = [[0 for _ in range(K + 1)] for __ in range(N + 1)]
    V_list, C_list = [], []
    for _ in range(N):
        vi, ci = map(int, input().split())
        V_list.append(vi)
        C_list.append(ci)
    print('#{} {}'.format(tc + 1, Knapsack(K, V_list, C_list, N)))