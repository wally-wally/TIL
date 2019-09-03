import sys
sys.stdin = open('input_5108.txt', 'r')

T = int(input())

for a in range(T):
    N, M, L = map(int, input().split())
    numbers = list(map(int, input().split()))
    for _ in range(M):
        idx, num = map(int, input().split())
        numbers.insert(idx, num)
    print('#{} {}'.format(a + 1, numbers[L]))