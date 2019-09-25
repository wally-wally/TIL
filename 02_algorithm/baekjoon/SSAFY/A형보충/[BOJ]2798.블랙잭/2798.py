import sys
sys.stdin = open('input_2798.txt', 'r')

import itertools

N, M = map(int, input().split())
arr = sorted(list(map(int, input().split())), reverse=True)
result = 0
for element in list(itertools.combinations(arr, 3)):
    Sum_value = sum(element)
    if Sum_value <= M and result <= Sum_value:
        result = Sum_value
        if Sum_value == M:
            break
print(result)