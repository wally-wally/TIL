import sys
sys.stdin = open('input_2748.txt', 'r')

def fibo(n):
    # base case
    if n == 0 or n == 1:
        return n
    # other case
    memo[0], memo[1] = 0, 1
    for i in range(2, n + 1):
        memo[i] = memo[i - 1] + memo[i - 2]
    return memo[n]
    

N = int(input())
memo = [0] * (N + 1)
print(fibo(N))