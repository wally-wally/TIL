import sys
sys.stdin = open('input_1865.txt', 'r')

def probability(data):
    global probability_value
    result = 1
    for n in range(N):
        if arr[n][data[n]] != 0:
            result *= (arr[n][data[n]] / 100)
            if result < probability_value:
                return
    else:
        probability_value = result

# def perm(k, n, used):
#     if k == n:
#         probability(order)
#     for i in range(n):
#         if used & (1 << i): continue
#         order.append(number_list[i])
#         perm(k + 1, n, used | (1 << i))
#         order.pop()

# import itertools
# def perm(k):
#     for element in itertools.permutations(number_list):
#         probability(list(element))

# def perm(k):
#     if k == N:
#         # print(number_list)
#         probability(number_list)
#     else:
#         for i in range(k, N):
#             number_list[k], number_list[i] = number_list[i], number_list[k]
#             perm(k + 1)
#             number_list[k], number_list[i] = number_list[i], number_list[k]

for test_case in range(int(input())):
    probability_value = 0
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    number_list = [num for num in range(N)]
    order = []
    perm(0, N, 0)
    print('#{} {:0<9}'.format(test_case + 1, round(probability_value * 100, 6)))