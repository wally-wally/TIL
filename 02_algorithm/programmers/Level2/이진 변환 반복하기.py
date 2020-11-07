def solution(s):
    change_binary_count, eliminate_zero_count = 0, 0
    while True:
        change_binary_count += 1
        # 1. 모든 0 제거
        eliminate_zero_count += s.count('0')
        s = s.replace('0', '')
        # 2. c를 2진법으로 표현
        s_length = len(s)
        s = bin(s_length)[2:]
        if s == '1':
            break
    return [change_binary_count, eliminate_zero_count]


print(solution('110010101001'))
print(solution('01110'))
print(solution('1111111'))