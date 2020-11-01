import sys
sys.stdin = open('input_11653.txt', 'r')

N = int(input())
while N >= 2:
    for i in range(2, N + 1):
        if N % i == 0:
            print(i)
            break
    N = N // i