import sys
sys.stdin = open('input_3234.txt', 'r')

# 1
def weight_check(k, DP_num, left_sum, right_sum):
    if left_sum < right_sum:
        return 0
    if k == N:
        return 1
    if DP[DP_num] != -1:
        return DP[DP_num]
    result = 0
    for i in range(N):
        if not visited[i]:
            visited[i] = True
            result += weight_check(k + 1, DP_num + 2 ** (i + N), left_sum + weights[i], right_sum)
            result += weight_check(k + 1, DP_num + 2 ** i, left_sum, right_sum + weights[i])
            visited[i] = False
    DP[DP_num] = result
    return result

for tc in range(int(input())):
    N = int(input())
    weights = list(map(int, input().split()))
    visited = [False] * N
    DP = [-1] * (1 << (N * 2))
    result = weight_check(0, 0, 0, 0)
    print('#{} {}'.format(tc + 1, result)) 


# 2(하지만 시간초과...)
# def weight_check(k, left_sum, right_sum):
#     global result
#     if left_sum < right_sum:
#         return
#     if k >= N:
#         result += 1
#         return
#     if left_sum > sum(weights) - left_sum:
#         result += (1 << (N - k)) * factorial[N - k]
#         return
#     for i in range(N):
#         if not visited[i]:
#             visited[i] = True
#             weight_check(k + 1, left_sum + weights[i], right_sum)
#             if left_sum - (weights[i] + right_sum) >= 0:
#                 weight_check(k + 1, left_sum, right_sum + weights[i])
#             visited[i] = False
 
# for tc in range(int(input())):
#     N = int(input())
#     weights = list(map(int, input().split()))
#     factorial = [0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]
#     result = 0
#     visited = [False] * N
#     for idx in range(N):
#         visited[idx] = True
#         weight_check(1, weights[idx], 0)
#         visited[idx] = False 
#     print('#{} {}'.format(tc + 1, result))
