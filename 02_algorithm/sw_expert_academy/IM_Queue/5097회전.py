import sys
sys.stdin = open('5097_input.txt', 'r')

T = int(input())

for a in range(T):
    N, M = map(int, input().split())
    queue = list(map(int, input().split()))
    for b in range(M):
        element = queue.pop(0)
        queue.append(element)
    print('#{} {}'.format(a + 1, queue[0]))