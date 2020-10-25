import sys
sys.stdin = open('input_1725.txt', 'r')

from collections import deque

N = int(input())
numbers = [int(input()) for _ in range(N)] + [0]

dq = deque()

answer = 0
for i in range(N + 1):
    while (dq and numbers[dq[-1]] > numbers[i]):
        idx = dq[-1]
        dq.pop()
        width = i if not dq else i - dq[-1] - 1
        answer = max(answer, numbers[idx] * width)
    dq.append(i)

print(answer)