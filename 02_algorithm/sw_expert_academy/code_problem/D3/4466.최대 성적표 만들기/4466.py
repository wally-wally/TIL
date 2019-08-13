import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    N, K = map(int, input().split())
    scores = sorted(list(map(int, input().split())), reverse=True)
    print('#{} {}'.format(a + 1, sum(scores[0:K])))