import sys
sys.stdin = open('input_10872.txt', 'r')

def factorial(n):
    # base case
    if n <= 1:
        return memo[n]
    # other case
    for i in range(2, n + 1):
        memo[i] = memo[i - 1] * i
    return memo[i]

N = int(input())
memo = [1] * (N + 1)
print(factorial(N))