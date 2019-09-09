import sys
sys.stdin = open('input_1242.txt', 'r')

def adjust_code(secret_code, leng, times):
    if leng == 56 * times:
        zero_cnt = 0
        for a in range(leng - 1, -1, -1):
            if secret_code[a] == '0':
                zero_cnt += 1
            elif secret_code[a] == '1':
                return '0' * zero_cnt + secret_code[:leng-zero_cnt]
    elif leng > 56 * times:
        zero_cnt = 0
        for a in range(leng - 1, -1, -1):
            if secret_code[a] == '0':
                zero_cnt += 1
            elif secret_code[a] == '1':
                break
        front_zero_eliminate = leng - zero_cnt - (56 * times)
        # print(front_zero_eliminate)
        return secret_code[front_zero_eliminate : leng-zero_cnt]
    elif leng < 56 * times:
        zero_cnt = 0
        for b in range(leng - 1, -1, -1):
            if secret_code[b] == '0':
                zero_cnt += 1
            elif secret_code[b] == '1':
                return '0' * (zero_cnt + (56 * times - leng)) + secret_code[:leng-zero_cnt]

def code_(data):
    length = 0
    code_data = ''
    all_length = len(data)
    pattern_list = []
    for i in range(all_length):
        if data[i] != '0':
            length += 1
            code_data += data[i]
        elif data[i] == '0' and length > 0:
            if i <= M - 4 and data[i : i + 4] == '0000':
                if code_data not in pattern_list:
                    pattern_list.append(code_data)
            elif i == M - 3 and data[i : i + 3] == '000':
                if code_data not in pattern_list:
                    pattern_list.append(code_data)
            elif i == M - 2 and data[i : i + 2] == '00':
                if code_data not in pattern_list:
                    pattern_list.append(code_data)
            elif i == M - 1 and data[i] == '0':
                if code_data not in pattern_list:
                    pattern_list.append(code_data)
            else:
                code_data += data[i]
    return pattern_list

for test_case in range(int(input())):
    numbers_rate = {
        '0' : [3, 2, 1, 1],
        '1' : [2, 2, 2, 1],
        '2' : [2, 1, 2, 2],
        '3' : [1, 4, 1, 1],
        '4' : [1, 1, 3, 2],
        '5' : [1, 2, 3, 1],
        '6' : [1, 1, 1, 4],
        '7' : [1, 3, 1, 2],
        '8' : [1, 2, 1, 3],
        '9' : [3, 1, 1, 2]
    }
    N, M = map(int, input().split())
    arr = []
    verify_code = ''
    for _ in range(N):
        arr.append(input())
    ver_code_list = []
    for p in range(N):
        if arr[p] != '0' * M:
            verify_code = code_(arr[p])
            for verify in verify_code:
                if verify not in ver_code_list:
                    ver_code_list.append(verify)
    # print(len(ver_code_list))

    final_result = 0
    for ver_code in ver_code_list:
        binary_code = ''
        for hex_num in ver_code: # 1bit 16진수를 4bit 2진수로 바꾸기
            if len(bin(int(hex_num, 16))[2:]) == 1:
                elem = '000' + bin(int(hex_num, 16))[2:]
            elif len(bin(int(hex_num, 16))[2:]) == 2:
                elem = '00' + bin(int(hex_num, 16))[2:]
            elif len(bin(int(hex_num, 16))[2:]) == 3:
                elem = '0' + bin(int(hex_num, 16))[2:]
            else:
                elem = bin(int(hex_num, 16))[2:]
            binary_code += elem
        # print(binary_code, len(binary_code))
        bin_len = len(binary_code)
        n = 1
        no_answer = 0
        while True:
            if bin_len == 56 * n or bin_len == 56 * n + 4 or bin_len == 56 * n - 4: # 코드 길이 늘어나는 배수 계산
                # print(n)
                code_len_times = n
                break
            if n == 501:
                no_answer = 1
                break
            n += 1
        adj_code = adjust_code(binary_code, bin_len, n)
        # print(adj_code)
        if not no_answer:
            leng_rate_list = []
            segment_cnt, now_num  = 0, -1
            total_segment_cnt = 0
            odd_list, even_list = [], [] # 최종 각 자리의 10진수로 변환한 암호코드 값(홀수자리, 짝수자리의 수를 각각 분류)
            total_list = []
            complete_variable = 1
            for code_num in adj_code:
                if now_num != code_num:
                    if now_num != -1:
                        leng_rate_list.append(segment_cnt)
                        segment_cnt = 0
                    now_num = code_num
                segment_cnt += 1
                total_segment_cnt += 1
                if total_segment_cnt == len(adj_code):
                    leng_rate_list.append(segment_cnt)
                if not len(leng_rate_list) % 4 and len(leng_rate_list) != 0:
                    for m in range(4):
                        leng_rate_list[m] = leng_rate_list[m] // code_len_times
                    break_num = 0
                    # print(leng_rate_list)
                    for k in range(8):
                        if break_num == 1:
                            break
                        for num, convert_code in numbers_rate.items():
                            if leng_rate_list == convert_code and complete_variable:
                                odd_list.append(int(num))
                                complete_variable = 0
                                break_num = 1
                            elif leng_rate_list == convert_code and not complete_variable:
                                even_list.append(int(num))
                                complete_variable = 1
                                break_num = 1
                    # print(odd_list, even_list)
                    leng_rate_list = []
            total_list = odd_list + even_list
            result = (sum(odd_list) * 3) + sum(even_list)
            # print(result)
            if result % 10 == 0:
                final_result += sum(total_list)
    print('#{} {}'.format(test_case + 1, final_result))