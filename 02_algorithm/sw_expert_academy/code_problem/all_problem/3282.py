import sys
sys.stdin = open('input.txt', 'r')

# 재귀나 동적계획법으로 풀어야 함...ㄷㄷ
# 어떻게 하지...?



# 부분집합 방법(제한시간 초과...)
# T = int(input())

# for a in range(T):
#     N, K = map(int, input().split())
#     v_list = []
#     c_list = []
#     for _ in range(N):
#         v, c = map(int, input().split())
#         v_list.append(v)
#         c_list.append(c)
#     max_c = 0
#     for subset in range(1 << N):
#         sum_c, sum_v = 0, 0
#         for i in range(N + 1):
#             if subset & (1 << i):
#                 sum_v += v_list[i]
#                 sum_c += c_list[i]
#         if sum_v <= K:
#             if sum_c >= max_c:
#                 max_c = sum_c
#     print('#{} {}'.format(a + 1, max_c))