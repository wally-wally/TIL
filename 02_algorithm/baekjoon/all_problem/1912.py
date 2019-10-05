import sys
sys.stdin = open('input_1912.txt', 'r')

n = int(input())
arr = list(map(int, input().split()))
DP = [arr[0]] + [0] * (n - 1)
result = DP[0]
for i in range(1, n):
    DP[i] = max(DP[i - 1] + arr[i], arr[i])
    result = max(result, DP[i])
print(result)