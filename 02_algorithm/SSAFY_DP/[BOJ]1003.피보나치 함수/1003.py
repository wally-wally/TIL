import sys
sys.stdin = open('input_1003.txt', 'r')

def fibo(n):
    if n == 0:
        return 1, 0
    elif n == 1:
        return 0, 1
    zero[0], one[1] = 1, 1
    for i in range(2, n + 1):
        zero[i] = zero[i - 1] + zero[i - 2]
        one[i] = one[i - 1] + one[i - 2]
    return zero[n], one[n]

for _ in range(int(input())):
    N = int(input())
    zero = [0] * (N + 1)
    one = [0] * (N + 1)
    a, b = fibo(N)
    print(a, b)

# cf)피보나치 함수 DP로 구현
# def fibo(n):
#     # base case
#     if n == 0 or n == 1:
#         return n
#     # other case
#     memo[0], memo[1] = 0, 1
#     for i in range(2, n + 1):
#         memo[i] = memo[i - 1] + memo[i - 2]
#     return memo[n]
    

# for _ in range(int(input())):
#     N = int(input())
#     memo = [0] * (N + 1)
#     print(fibo(N))