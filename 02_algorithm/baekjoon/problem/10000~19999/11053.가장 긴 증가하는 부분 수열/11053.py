import sys
sys.stdin = open('input_11053.txt', 'r')

N = int(input())
arr = [0] + list(map(int, input().split()))
DP = [0] * (N + 1)
result = 0

for i in range(1, N + 1):
    min_value = 0
    for j in range(i):
        if arr[i] > arr[j]:
            if min_value < DP[j]:
                min_value = DP[j]
    
    DP[i] = min_value + 1
    if result < DP[i]:
        result = DP[i]
    
print(result)