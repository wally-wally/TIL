memo = [-1] * 100

def fibonacci(n): # n 번째 피보나치 수를 반환
    memo[0], memo[1] = 0, 1
    for i in range(2, n + 1): # i ==> 문제를 나타내는 값
        memo[i] = memo[i - 1] + memo[i - 2]
    return memo[n]

print(fibonacci(10))