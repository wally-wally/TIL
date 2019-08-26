# 중위 표기법 -> 후위 표기법

formula = '2+3*4/5'

operand = []

for data in formula:
    if data.isdigit():
        print(data, end = ' ')
    else:
        operand.append(data)

for i in range(len(operand)):
    print(operand.pop(), end=' ')