import sys
sys.stdin = open('input_16637.txt', 'r')

def calc(x, y, oper):
    result = int(x)
    if oper == '+':
        result += int(y)
    elif oper == '-':
        result -= int(y)
    else:
        result *= int(y)
    return result

def make_expression(idx, current_value):
    global answer
    # 1. 종료 조건
    if idx > N - 1:
        answer = max(answer, current_value)
        return
    operator = '+' if idx == 0 else expression[idx - 1]

    # 2. 괄호로 묶는다 = 이전 + 괄호 계산
    if idx + 2 < N:
        bracket = calc(expression[idx], expression[idx + 2], expression[idx + 1])
        make_expression(idx + 4, calc(current_value, bracket, operator))

    # 3. 안 묶는다 = 이전 + 다음
    make_expression(idx + 2, calc(current_value, expression[idx], operator))
    

N = int(input())
expression = input()
answer = -0xfffffffffffffff
make_expression(0, 0)
print(answer)