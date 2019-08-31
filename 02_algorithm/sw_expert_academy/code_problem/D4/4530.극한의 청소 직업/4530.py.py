import sys
sys.stdin = open('input.txt', 'r')

def check(num):
    step = 0
    length = len(str(num))
    str_num = str(num)
    digit = 0
    for i in range(length - 1, -1, -1):
        value = int(str_num[i])
        if value > 4:
            value -= 1
        step += value * pow(9, digit)
        digit += 1
    return step - 1

T = int(input())

for a in range(T):
    A, B = map(int, input().split())
    if A < 0 and B > 0:
        result = check(abs(A)) + check(abs(B)) + 1
    else:
        result = check(abs(B)) - check(abs(A))
    print('#{} {}'.format(a + 1, result))

# 수행시간이 매우 오래 걸림
# for a in range(T):
#     A, B = map(int, input().split())
#     step = 0
#     for i in range(A + 1, B + 1):
#         if '4' not in str(i) and i != 0:
#             step += 1
#     print('#{} {}'.format(a + 1, step))