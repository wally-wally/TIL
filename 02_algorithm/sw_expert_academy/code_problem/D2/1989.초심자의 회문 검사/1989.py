import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for i in range(T):
    data = input()
    result = 1 if data == data[::-1] else 0
    print('#{} {}'.format(i+1, result))