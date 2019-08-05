import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for i in range(T):
    num_count = int(input())
    num_list = sorted(list(map(int, input().split())))
    if num_count & 1:
        middle_position = num_count // 2
        result = num_list[middle_position] ** 2
    else:
        result = num_list[0] * num_list[num_count-1]
    print('#{} {}'.format(i+1, result))
            