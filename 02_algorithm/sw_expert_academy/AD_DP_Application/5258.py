import sys
sys.stdin = open('input_5258.txt', 'r')

def happybox(n, s_lst, c_lst, m):
    for i in range(1, m + 1):
        for j in range(1, n + 1):
                DP[i][j] = max(c_lst[i - 1] + DP[i - 1][j - s_lst[i - 1]], DP[i - 1][j]) if s_lst[i - 1] <= j else DP[i - 1][j]
    return DP[m][n]

for tc in range(int(input())):
    N, M = map(int, input().split())
    DP = [[0 for _ in range(N + 1)] for __ in range(M + 1)]
    S_list, C_list = [], []
    for _ in range(M):
        si, ci = map(int, input().split())
        S_list.append(si)
        C_list.append(ci)
    print('#{} {}'.format(tc + 1, happybox(N, S_list, C_list, M)))