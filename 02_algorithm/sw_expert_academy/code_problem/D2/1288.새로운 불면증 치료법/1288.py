import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for i in range(T):
    init_value = num = int(input())
    check_list = []
    count = 1
    result = 0
    while True:
        for n in str(num):
            if n not in check_list:
                check_list.append(n)
            if len(check_list) == 10:
                result = count
        if result:
            break
        count += 1
        num += init_value
    print('#{} {}'.format(i+1, num))