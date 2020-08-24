import sys
sys.stdin = open('input_10505.txt', 'r')

for tc in range(int(input())):
    N = int(input())
    incomes = list(map(int, input().split()))
    print('#{} {}'.format(tc + 1, len(list(filter(lambda x: x <= (sum(incomes) / N), incomes)))))