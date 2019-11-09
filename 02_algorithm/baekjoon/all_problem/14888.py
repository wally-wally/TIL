import sys
sys.stdin = open('input.txt', 'r')

# 1. DFS
def Operation(N, cnt, res):
    global operators, numbers, min_value, max_value
    if cnt == N:
        if res < min_value:
            min_value = res
        if res > max_value:
            max_value = res
        return

    if operators[0]:
        operators[0] -= 1
        Operation(N, cnt + 1, res + numbers[cnt])
        operators[0] += 1
    
    if operators[1]:
        operators[1] -= 1
        Operation(N, cnt + 1, res - numbers[cnt])
        operators[1] += 1

    if operators[2]:
        operators[2] -= 1
        Operation(N, cnt + 1, res * numbers[cnt])
        operators[2] += 1

    if operators[3]:
        operators[3] -= 1
        Operation(N, cnt + 1, int(res / numbers[cnt]))
        operators[3] += 1

N = int(input())
numbers = list(map(int, input().split()))
operators = list(map(int, input().split()))

min_value, max_value = 0xffffffff, -10e9

Operation(N, 1, numbers[0])

print(max_value)
print(min_value)


# 2. itertools 사용 (단, pypy3로 제출해야 함 => 즉, 시간이 너무 오래 걸림)
# import itertools

# N = int(input())
# numbers = list(map(int, input().split()))
# operators = []
# operators_info = list(map(int, input().split()))
# operators_cnt = sum(operators_info)
# for idx in range(4):
#     for _ in range(operators_info[idx]):
#         if idx == 0:
#             operators.append('+')
#         elif idx == 1:
#             operators.append('-')
#         elif idx == 2:
#             operators.append('*')
#         else:
#             operators.append('/')
# # print(numbers, operators)

# min_value, max_value = 0xffffffff, -10e9
# for perm in itertools.permutations([n for n in range(operators_cnt)], operators_cnt):
#     # print(perm)
#     temp_value = numbers[0]
#     for idx in range(operators_cnt):
#         if operators[perm[idx]] == '+':
#             temp_value += numbers[idx + 1]
#         elif operators[perm[idx]] == '-':
#             temp_value -= numbers[idx + 1]
#         elif operators[perm[idx]] == '*':
#             temp_value *= numbers[idx + 1]
#         else:
#             if temp_value < 0:
#                 temp_value = -(-temp_value // numbers[idx + 1])
#             else:
#                 temp_value = temp_value // numbers[idx + 1]
#         # print(temp_value)
#     if min_value > temp_value:
#         min_value = temp_value
#     if max_value < temp_value:
#         max_value = temp_value
#     temp_value = numbers[0]

# print(max_value)
# print(min_value)