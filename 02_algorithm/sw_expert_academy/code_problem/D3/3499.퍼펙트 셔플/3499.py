import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    N = int(input())
    card_list = list(map(str, input().split()))
    print('#{}'.format(a + 1), end=' ')
    for i in range(N // 2):
        print(card_list[i], end=' ')
        if N % 2:
            print(card_list[(N // 2) + 1 + i], end=' ')
            if i == N // 2 - 1:
                print(card_list[i + 1], end=' ')
        else:
            print(card_list[(N // 2) + i], end=' ')
    print()