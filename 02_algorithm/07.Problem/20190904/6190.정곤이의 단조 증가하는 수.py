import sys
sys.stdin = open('input_6190.txt', 'r')

# 3. 이중 for문으로 구현(성공!)
for a in range(int(input())):
    N = int(input())
    A_list = list(map(int, input().split()))
    result = -1
    for i in range(N):
        for j in range(i + 1, N):
            check_num = A_list[i] * A_list[j]
            if check_num >= 10:
                check = 1
                for m in str(check_num):
                    if int(m) >= check:
                        check = int(m)
                    else:
                        break
                else:
                    if check_num >= result:
                        result = check_num
    print('#{} {}'.format(a + 1, result))


# 2. 부분집합 원리로 구현(제한시간 초과...)
# for a in range(int(input())):
#     N = int(input())
#     A_list = list(map(int, input().split()))
#     result = -1
#     for subset in range(1 << N):
#         numbers = []
#         for j in range(N + 1):
#             if subset & (1 << j):
#                 numbers.append(A_list[j])
#         if len(numbers) == 2:
#             value = 1
#             for k in numbers:
#                 value *= k
#             if value >= 10:
#                 check = 1
#                 for m in str(value):
#                     if int(m) >= check:
#                         check = int(m)
#                     else:
#                         break
#                 else:
#                     if value >= result:
#                         result = value
#     print('#{} {}'.format(a + 1, result))


# 1. 리스트에서 2개의 원소를 뽑는 순열로 구현(제한시간 초과...)
# def perm(lst, s_1, s_2):
#     for idx_1 in range(s_1, len(lst)):
#         for idx_2 in range(s_2, len(lst)):
#             if lst[idx_1] != lst[idx_2]:
#                 if sorted([lst[idx_1], lst[idx_2]]) not in perm_list:
#                     perm_list.append(sorted([lst[idx_1], lst[idx_2]]))
#                     return [lst[idx_1], lst[idx_2], idx_1, idx_2]
#         s_2 = 0
#     return -1

# for a in range(int(input())):
#     N = int(input())
#     A_list = list(map(int, input().split()))
#     perm_list = []
#     start_1, start_2 = 0, 0
#     result = -1
#     while True:
#         perm_result = perm(A_list, start_1, start_2)
#         if perm_result == -1:
#             break
#         x, y, s1, s2 = map(int, perm_result)
#         check_num = x * y
#         if check_num >= 10:
#             value = 0
#             for i in str(check_num):
#                 if int(i) >= value:
#                     value = int(i)
#                 else:
#                     break
#             else:
#                 if check_num >= result:
#                     result = check_num
#         start_1, start_2 = s1, s2
#     print('#{} {}'.format(a + 1, result))