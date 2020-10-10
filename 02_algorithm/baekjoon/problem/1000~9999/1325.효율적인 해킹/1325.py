import sys
sys.stdin = open('input_1325.txt', 'r')

# pypy3로 제출
from collections import deque

N, M = map(int, input().split())
connect_info = [[] for _ in range(N + 1)]
for _ in range(M):
    A, B = map(int, input().split())
    connect_info[B].append(A)

max_hacking_count, computers = 0, []
for i in range(1, N + 1):
    hacking_count = 0
    visited = [0 for _ in range(N + 1)]
    computer_deque = deque()
    computer_deque.append(i)
    visited[i] = 1
    while computer_deque:
        pop_computer = computer_deque.popleft()
        if not connect_info[pop_computer]:
            continue
        for j in connect_info[pop_computer]:
            if not visited[j]:
                visited[j] = 1
                computer_deque.append(j)
                hacking_count += 1
    if hacking_count > max_hacking_count:
        max_hacking_count = hacking_count
        computers = [i]
        continue
    if hacking_count == max_hacking_count:
        computers.append(i)
print(' '.join(map(str, computers)))