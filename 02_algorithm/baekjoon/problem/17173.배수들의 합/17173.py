import sys
sys.stdin = open('input_17173.txt', 'r')

N, M = map(int, input().split())
K_numbers =  list(map(int, input().split()))
sum_result = 0
for i in range(1, N + 1):
    for K_num in K_numbers:
        if not i % K_num:
            sum_result += i
            break
print(sum_result)