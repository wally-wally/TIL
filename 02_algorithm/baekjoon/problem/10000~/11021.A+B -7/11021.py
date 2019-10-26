import sys
sys.stdin = open('input_11021.txt', 'r')

for i in range(int(input())):
    print('Case #{}: {}'.format(i + 1, sum(map(int, input().split()))))