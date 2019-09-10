import sys
sys.stdin = open('input_1240.txt', 'r')

def code_(data):
    length = 0
    code_data = ''
    for element in data:
        if element == '1': # 처음 1이 나오는 경우
            length += 1
            code_data += element
        elif element == '0' and length > 0:
            code_data += element
        if len(code_data) == 56:
            zero_cnt = 0
            for i in range(len(code_data) - 1, -1, -1):
                if code_data[i] == '0':
                    zero_cnt += 1
                elif code_data[i] == '1':
                    return '0' * zero_cnt + code_data[:len(code_data)-zero_cnt]

for test_case in range(int(input())):
    numbers = {
        '0001101' : '0',
        '0011001' : '1',
        '0010011' : '2',
        '0111101' : '3',
        '0100011' : '4',
        '0110001' : '5',
        '0101111' : '6',
        '0111011' : '7',
        '0110111' : '8',
        '0001011' : '9'
    }
    N, M = map(int, input().split())
    arr = []
    verify_code = ''
    for _ in range(N):
        arr.append(input())
    for p in range(N):
        if arr[p] != '0' * M:
            verify_code = code_(arr[p])
            break

    Sum_value = 0
    odd_list, even_list = [], []
    for k in range(8):
        binary_number = verify_code[7*k : 7*(k+1)]
        for num, code in numbers.items():
            if binary_number == num and k % 2 == 0:
                odd_list.append(int(numbers[num]))
            elif binary_number == num and k % 2 == 1:
                even_list.append(int(numbers[num]))
    total_list = odd_list + even_list
    result = (sum(odd_list) * 3) + sum(even_list)
    if result % 10 == 0:
        print('#{} {}'.format(test_case + 1, sum(total_list)))
    elif result % 10 != 0:
        print('#{} 0'.format(test_case + 1))