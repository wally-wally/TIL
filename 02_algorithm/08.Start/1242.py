import sys
sys.stdin = open('input_1242.txt', 'r')

def find(array, posi):
    k = M * 4 - 1
    data = array[posi]
    value = []
    while k >= 0:
        k -= 1
        code_data = []
        if data[k] == '1':
            if array[posi - 1][k] == 0: continue
            pwd = []
            for _ in range(8):
                c2 = c3 = c4 = 0
                while data[k] == '0' :
                    k = k - 1
                while data[k] == '1' :
                    code_data.insert(0, data[k])
                    c4, k = c4 + 1, k - 1
                while data[k] == '0' :
                    code_data.insert(0, data[k])
                    c3, k = c3 + 1, k - 1
                while data[k] == '1' :
                    code_data.insert(0, data[k])
                    c2, k = c2 + 1, k - 1
                MIN = min(c2, c3, c4)
                pwd.append(numbers_rate[str(c2//MIN) + str(c3//MIN) + str(c4//MIN)])
            if code_data not in visited:
                visited.append(code_data)
                b = pwd[0] + pwd[2] + pwd[4] + pwd[6]
                a = pwd[1] + pwd[3] + pwd[5] + pwd[7]
                if (a * 3 + b) % 10 == 0:
                    value.append([a + b, code_data])
                else:
                    value.append([0, code_data])
    return value

def four_bit_bin(hex_value):
    if len(bin(int(hex_value, 16))[2:]) == 1:
        elem = '000' + bin(int(hex_value, 16))[2:]
    elif len(bin(int(hex_value, 16))[2:]) == 2:
        elem = '00' + bin(int(hex_value, 16))[2:]
    elif len(bin(int(hex_value, 16))[2:]) == 3:
        elem = '0' + bin(int(hex_value, 16))[2:]
    else:
        elem = bin(int(hex_value, 16))[2:]
    return elem

def change_bin_arr(array):
    bin_list = []
    for a in range(N):
        element = [four_bit_bin(arr[a][b]) for b in range(M)]
        bin_list.append(''.join(element))
    return bin_list

for test_case in range(int(input())):
    numbers_rate = {
        '211' : 0,
        '221' : 1,
        '122' : 2,
        '411' : 3,
        '132' : 4,
        '231' : 5,
        '114' : 6,
        '312' : 7,
        '213' : 8,
        '112' : 9
    }
    N, M = map(int, input().split())
    arr = [input() for _ in range(N)]
    bin_arr = change_bin_arr(arr)

    result = 0
    visited = []
    for p in range(N):
        if bin_arr[p] != '0' * (M * 4):
            info = find(bin_arr, p)
            for l in range(len(info)):
                result += info[l][0]
    print('#{} {}'.format(test_case + 1, result))


# [실패작] 런타임 에러... 앞에서부터 계산해서 과정이 상당히 꼬임...

# def calc_len_tiems(len_num):
#     n = 1
#     while True:
#         if (56 * n) - 28 < len_num <=  (56 * n) + 28:
#             return n
#         n += 1

# def Binary_code(CODE): # 1bit 16진수를 4bit 2진수로 바꾸기
#     hex_to_bin = {'0':'0000', '1':'0001', '2':'0010', '3':'0011',
#                   '4':'0100', '5':'0101', '6':'0110', '7':'0111',
#                   '8':'1000', '9':'1001', 'A':'1010', 'B':'1011',
#                   'C':'1100', 'D':'1101', 'E':'1110', 'F':'1111'}
#     binary_code = ''
#     for hex_num in CODE:
#         binary_code += hex_to_bin[hex_num]
#     return binary_code

# def adjust_code(secret_code, leng, times):
#     if leng <= 56 * times:
#         zero_cnt = 0
#         for a in range(leng - 1, -1, -1):
#             if secret_code[a] == '0':
#                 zero_cnt += 1
#             elif secret_code[a] == '1':
#                 if leng == 56 * times:
#                     return '0' * zero_cnt + secret_code[:leng-zero_cnt]
#                 else:
#                     return '0' * (zero_cnt + (56 * times - leng)) + secret_code[:leng-zero_cnt]
 
#     elif leng > 56 * times:
#         zero_cnt = 0
#         for a in range(leng - 1, -1, -1):
#             if secret_code[a] == '0':
#                 zero_cnt += 1
#             elif secret_code[a] == '1':
#                 break
#         front_zero_eliminate = leng - zero_cnt - (56 * times)
#         return secret_code[front_zero_eliminate : leng-zero_cnt]

# def code_(data):
#     code_data = ''
#     pattern_list = []
#     for i in range(len(data)):
#         if data[i] != '0':
#             code_data += data[i]
#         elif data[i] == '0' and len(code_data) > 0:
#             if i <= M - 4 and data[i : i + 4] == '0000':
#                 pattern_list.append(code_data)
#                 code_data = ''
#             # elif i <= M - 4 and code_data in ver_code_list:
#             #     code_data = ''
#             elif i == M - 3 and data[i : i + 3] == '000':
#                 pattern_list.append(code_data)
#                 code_data = ''
#             elif i == M - 2 and data[i : i + 2] == '00':
#                 pattern_list.append(code_data)
#                 code_data = ''
#             elif i == M - 1 and data[i : i + 1] == '0':
#                 pattern_list.append(code_data)
#                 code_data = ''
#             else:
#                 code_data += data[i]
#         # if code_data in ver_code_list:
#         #     code_data = ''
#         print(code_data)
#     if code_data != '':
#         pattern_list.append(code_data)
#     print(pattern_list)
#     return pattern_list

# for test_case in range(int(input())):
#     numbers_rate = {
#         '0' : '3211',
#         '1' : '2221',
#         '2' : '2122',
#         '3' : '1411',
#         '4' : '1132',
#         '5' : '1231',
#         '6' : '1114',
#         '7' : '1312',
#         '8' : '1213',
#         '9' : '3112'
#     }
#     N, M = map(int, input().split())
#     arr = [input() for _ in range(N)]
#     ver_code_list = []
#     # visited = []
#     for p in range(N):
#         if arr[p] != '0' * M:
#             verify_code = code_(arr[p])
#             # print(verify_code)
#             for verify in verify_code:
#                 if verify not in ver_code_list:
#                     ver_code_list.append(verify.strip('0'))
#     # for qwe in range(len(ver_code_list)):
#     #     print('@{}'.format(ver_code_list[qwe]))

#     final_result = 0
#     for ver_code in ver_code_list:
#         print('--------------------------------')
#         print('@ {} / {}'.format(ver_code, len(ver_code)))
#         # print('-------------------------------------------------------------')
#         # print(ver_code, len(ver_code))
#         b_code = Binary_code(ver_code)
#         bin_len = len(b_code)
#         code_len_times = calc_len_tiems(bin_len)

#         # adj_code = adjust_code(binary_code, bin_len, n)
#         # print(adj_code, n)
#         adj_code = adjust_code(b_code, bin_len, code_len_times)
#         leng_rate_list = []
#         segment_cnt, now_num  = 0, -1
#         total_segment_cnt = 0
#         odd, even = 0, 0 # 최종 각 자리의 10진수로 변환한 암호코드 값(홀수자리, 짝수자리의 수를 각각 분류)
#         complete_variable = 1
#         for code_num in adj_code:
#             if now_num != code_num:
#                 if now_num != -1:
#                     leng_rate_list.append(segment_cnt)
#                     segment_cnt = 0
#                 now_num = code_num
#             segment_cnt += 1
#             total_segment_cnt += 1
#             if total_segment_cnt == len(adj_code):
#                 leng_rate_list.append(segment_cnt)
#             if not len(leng_rate_list) % 4 and len(leng_rate_list) != 0:
#                 for m in range(4):
#                     leng_rate_list[m] = leng_rate_list[m] // code_len_times
#                 # print(leng_rate_list)
#                 check_var = ''
#                 for elem in leng_rate_list:
#                     check_var += str(elem)
#                 # if complete_variable:
#                 #     odd += int(numbers_rate[check_var])
#                 #     complete_variable = 0
#                 # elif not complete_variable:
#                 #     even += int(numbers_rate[check_var])
#                 #     complete_variable = 0
                
#                 for num, convert_code in numbers_rate.items():
#                     if check_var == convert_code and complete_variable:
#                         odd += int(num)
#                         complete_variable = 0
#                     elif check_var == convert_code and not complete_variable:
#                         even += int(num)
#                         complete_variable = 1


#                 # print(odd_list, even_list)
#                 leng_rate_list = []
#         # result = (sum(odd_list) * 3) + sum(even_list)
#         # print(result, sum(total_list))
#         print((odd * 3) + even, odd + even, end=' ')
#         if not ((odd * 3) + even) % 10:
#             final_result += odd + even
#             print('Yes', final_result)
#         print()
#     print('#{} {}'.format(test_case + 1, final_result))