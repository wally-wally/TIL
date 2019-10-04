import sys
sys.stdin = open('input_1808.txt', 'r')

def available_number(num, count):
    if num > X or count > 7: # 만든 숫자가 입력한 숫자를 초과하거나 7자리 이상인 경우 리턴
        return
    for i in N_list:
        return_number = num + i
        if return_number:
            numbers.append(return_number)
            available_number(return_number * 10, count + 1)

def check_num(num, count): # 약수 체크
    global result
    if count and num == 1:
        result = min(count, result)
        return
    for idx in range(numbers_length - 1, -1, -1):
        if numbers[idx] != 1 & numbers[idx] <= num:
            if not num % numbers[idx]:
                check_num(num // numbers[idx], len(str(numbers[idx])) + count + 1)

for tc in range(int(input())):
    N_list = []
    idx = 0
    for num in list(map(int, input().split())):
        if num:
            N_list.append(idx)
        idx += 1
    X = int(input())
    numbers = []
    available_number(0, 0)
    if X in numbers:
        print('#{} {}'.format(tc + 1, len(str(X)) + 1))
        continue
    else:
        result = 1000000
    numbers_length = len(numbers)
    check_num(X, 0)
    print('#{} {}'.format(tc + 1, -1 if result == 1000000 else result))