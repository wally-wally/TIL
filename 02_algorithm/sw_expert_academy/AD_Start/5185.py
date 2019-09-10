import sys
sys.stdin = open('input_5185.txt', 'r')

for test_case in range(int(input())):
    N, hex_num = map(str, input().split())
    binary_code = ''
    for hex_value in hex_num:
        if len(bin(int(hex_value, 16))[2:]) == 1:
            elem = '000' + bin(int(hex_value, 16))[2:]
        elif len(bin(int(hex_value, 16))[2:]) == 2:
            elem = '00' + bin(int(hex_value, 16))[2:]
        elif len(bin(int(hex_value, 16))[2:]) == 3:
            elem = '0' + bin(int(hex_value, 16))[2:]
        else:
            elem = bin(int(hex_value, 16))[2:]
        binary_code += elem
    print('#{} {}'.format(test_case + 1, binary_code))