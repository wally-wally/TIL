import sys
sys.stdin = open('input.txt', 'r')

for a in range(int(input())):
    N, K = map(int, input().split())
    pass_student = list(set(map(int, input().split())))
    print('#{}'.format(a + 1), end=' ')
    for i in range(1, N + 1):
        if i not in pass_student:
            print(i, end=' ')
    print()