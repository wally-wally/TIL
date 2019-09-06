import sys
sys.stdin = open('input.txt', 'r')

for a in range(int(input())):
    A, B = map(int, input().split())
    n = A // B
    result = 0
    element = 1
    for _ in range(n):
        result += element
        element += 2
    print('#{} {}'.format(a + 1, result))