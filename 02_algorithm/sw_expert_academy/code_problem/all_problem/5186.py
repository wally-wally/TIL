import sys
sys.stdin = open('input_5186.txt', 'r')

for test_case in range(int(input())):
    N = float(input())
    result = ''
    while True:
        value = N * 2
        under_num_list = [int(num) for num in str(value)[2:]]
        if sum(under_num_list) != 0:
            result += str(int(N * 2))
            N = float('0.' + str(value)[2:]) if int(N * 2) == 0 else N * 2 - 1
        else:
            result += '1'
            print('#{} {}'.format(test_case + 1, result))
            break
        if len(result) > 12:
            print('#{} overflow'.format(test_case + 1))
            break
        