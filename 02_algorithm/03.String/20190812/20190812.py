import sys
sys.stdin = open('GNS_test_input.txt', 'r')

T = int(input())

num_list = ['ZRO', 'ONE', 'TWO', 'THR', 'FOR', 'FIV', 'SIX', 'SVN', 'EGT', 'NIN']

for a in range(T):
    arr = [0] * 10
    test_No, count = list(map(str, input().split()))
    test_data = list(map(str, input().split()))
    for b in range(int(count)):
        arr[num_list.index(test_data[b])] += 1

    result = ''.join([(num_list[c] + ' ') * arr[c] for c in range(10) if arr[c]])
    # result = ''
    # for c in range(10):
    #     if arr[c]:
    #         result += (num_list[c] + ' ') * arr[c]
    print('{} {}'.format(test_No, result))