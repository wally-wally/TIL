import sys
sys.stdin = open('input_10726.txt', 'r')

for tc in range(int(input())):
    N, M = map(int, input().split())
    if 2 ** N - 1 > M:
        print('#{} OFF'.format(tc + 1))
        continue
    binary_number = bin(M)[2:]
    on_count = len(list(filter(lambda x: x == '1', binary_number[len(binary_number) - N : len(binary_number)])))
    print('#{} {}'.format(tc + 1, 'ON' if on_count == N else 'OFF'))