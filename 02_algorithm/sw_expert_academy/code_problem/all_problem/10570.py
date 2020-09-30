import sys
sys.stdin = open('input_10570.txt', 'r')

for tc in range(int(input())):
    A, B = map(int, input().split())
    answer = 0
    for num in range(A, B + 1):
        if str(num) == str(num)[::-1]:
            sqrt = num ** (1 / 2)
            if sqrt % int(sqrt) == 0:
                if str(int(sqrt)) == str(int(sqrt))[::-1]:
                    answer += 1
    print('#{} {}'.format(tc + 1, answer))