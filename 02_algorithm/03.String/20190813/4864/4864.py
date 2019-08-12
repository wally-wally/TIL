import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    p = input()
    t = input()
    n, m = len(t), len(p)

    for i in range(n - m + 1):
        for j in range(m):
            if t[i + j] != p[j]:
                break
        else:
            print('#{} {}'.format(a + 1, 1))
            break
        if i == n - m:
            print('#{} {}'.format(a + 1, 0))