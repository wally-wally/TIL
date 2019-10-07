import sys
sys.stdin = open('input.txt', 'r')

import time
start = time.time()

def fibo(n):
    global cnt
    cnt += 1
    if n >= 2 and memo[n] == -1:
        memo[n] = fibo(n - 1) + fibo(n - 2)
    return memo[n]

N = int(input())
memo = [-1] * (N + 1)
memo[0], memo[1] = 0, 1
cnt = 0
print('피보나치 결과: ', fibo(N))
print('호출횟수: ', cnt)
print('수행시간: {}[ms]'.format(round(time.time() - start, 6)*1000))
# print(memo)