import sys
sys.stdin = open('input_11022.txt', 'r')

for i in range(int(input())):
    A, B = map(int, input().split())
    print('Case #{}: {} + {} = {}'.format(i + 1, A, B, A+B))