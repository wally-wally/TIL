import sys
sys.stdin = open('input_5430.txt', 'r')

import sys
from collections import deque

T = int(input())
for _ in range(T):
    commands = [command for command in input()]
    number_count = int(input())
    array = sys.stdin.readline().strip().replace('[', '').replace(']', '')
    if array == '':
        numbers = deque()
    else:
        numbers = deque(map(int, array.split(',')))
    reverse_var = 0 # 정방향(0), 역방향(1)
    for command in commands:
        if command == 'R':
            if reverse_var == 0:
                reverse_var = 1
            else:
                reverse_var = 0
        else:
            if len(numbers) == 0:
                print('error')
                break
            if reverse_var == 0:
                numbers.popleft()
            else:
                numbers.pop()
    else:
        if reverse_var == 1:
            numbers.reverse()
        print('[', end='')
        for i in range(len(numbers)):
            print(numbers[i], end='')
            if i != len(numbers) - 1:
                print(',', end='')
        print(']')