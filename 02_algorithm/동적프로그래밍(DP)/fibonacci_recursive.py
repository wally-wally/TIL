import sys
sys.stdin = open('input.txt', 'r')

import time
start = time.time()

def fibo(n):
    global cnt
    cnt += 1
    if n < 2:
        return n
    else:
        return fibo(n - 1) + fibo(n - 2)

cnt = 0 # 호출횟수 변수
N = int(input())
print('피보나치 결과: ', fibo(N))
print('호출횟수: ', cnt)
print('수행시간: {}[ms]'.format(round(time.time() - start, 6)*1000))