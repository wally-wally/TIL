import sys
sys.stdin = open('input_10866.txt', 'r')

import sys
from collections import deque
input = sys.stdin.readline

d = deque()
for _ in range(int(input())):
    command = input().split()
    if command[0] == 'push_front':
        d.appendleft(int(command[1]))
    elif command[0] == 'push_back':
        d.append(int(command[1]))
    elif command[0] == 'size':
        print(len(d))
    elif command[0] == 'empty':
        print(0 if d else 1)
    else:
        if len(d) == 0:
            print(-1)
            continue
        if command[0] == 'pop_front':
            print(d.popleft())
        if command[0] == 'pop_back':
            print(d.pop())
        if command[0] == 'front':
            print(d[0])
        if command[0] == 'back':
            print(d[len(d) - 1])