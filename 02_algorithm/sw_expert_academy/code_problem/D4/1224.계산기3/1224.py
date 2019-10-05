import sys
sys.stdin = open('input_1224.txt', 'r')

for a in range(10):
    # 중위표기법 => 후위표기법
    length = int(input())
    formula = input()
    stack = []
    result = []
    isp = [['('], ['+', '-'], ['*', '/'], [')']]
    icp = [[], ['+', '-'], ['*', '/'], ['('], [')']]
    for data in formula:
        if data == '(':
            stack.append(data)
        elif data.isdigit():
            result.append(data)
        elif data in ['+', '-', '*', '/']:
            while True:
                top_position = 0
                for sp in isp:
                    if stack[-1] in sp:
                        break
                    top_position += 1
                data_position = 0
                for cp in icp:
                    if data in cp:
                        break
                    data_position += 1
                if top_position < data_position:
                    stack.append(data)
                    break
                else:
                    result.append(stack[-1])
                    stack.pop()
        elif data == ')':
            while True:
                criteria = stack.pop()
                if criteria in ['+', '-', '*', '/']:
                    result.append(criteria)
                if criteria == '(':
                    break
    
    # 후위 표기법 => 수식 계산
    num_stack = []
    for elem in result:
        if elem.isdigit():
            num_stack.append(int(elem))
        elif elem == '+':
            x = num_stack.pop()
            y = num_stack.pop()
            z = y + x
            num_stack.append(z)
        elif elem == '-':
            x = num_stack.pop()
            y = num_stack.pop()
            z = y - x
            num_stack.append(z)
        elif elem == '*':
            x = num_stack.pop()
            y = num_stack.pop()
            z = y * x
            num_stack.append(z)
        elif elem == '/':
            x = num_stack.pop()
            y = num_stack.pop()
            z = y // x
            num_stack.append(z)
    answer = num_stack.pop()
    print('#{} {}'.format(a + 1, answer))