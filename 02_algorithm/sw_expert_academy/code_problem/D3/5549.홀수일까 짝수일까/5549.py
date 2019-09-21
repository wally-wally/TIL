import sys
sys.stdin = open('input_5549.txt', 'r')

for test_case in range(int(input())):
    print('#{}'.format(test_case + 1), end=' ')
    print('Odd' if int(input()[-1]) % 2 else 'Even')