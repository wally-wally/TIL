import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    data_count = int(input())
    linear_result = ''
    for b in range(data_count):
        alpha, count = input().split()
        linear_result += alpha * int(count)

    ten_line = len(linear_result) // 10

    print('#{}'.format(a + 1))
    for i in range(ten_line):
        start_position = i * 10
        print(linear_result[start_position : start_position + 10])
    print(linear_result[ten_line * 10 : len(linear_result)])