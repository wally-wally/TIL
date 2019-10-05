import sys
sys.stdin = open('input_15954.txt', 'r')

N, K = map(int, input().split())
like_cnt = list(map(int, input().split()))
mean, var, SD = 0, 0, 0 # 평균, 분산, 표준편차
result = float('inf')
while K != N + 1:
    for i in range(((N - K) // 1) + 1):
        mean_elem_sum = 0
        var_elem_sum = 0
        for j in range(i, i + K):
            mean_elem_sum += like_cnt[j]
        mean = mean_elem_sum / K
        for k in range(i, i + K):
            var_elem_sum += (like_cnt[k] - mean)**2
        var = var_elem_sum / K
        SD = var**0.5
        if SD <= result:
            result = SD
    K += 1
print(result)