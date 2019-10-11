import sys
sys.stdin = open('input_1232.txt', 'r')

def calc(num_1, num_2, operator):
    if operator == '+':
        stack.append(num_1 + num_2)
    elif operator == '-':
        stack.append(num_2 - num_1)
    elif operator == '*':
        stack.append(num_1 * num_2)
    else:
        stack.append(num_2 // num_1)

def preorder(n):
    if n != 0:
        stack.append(element[n])
        while len(stack) > 1:
            if stack[-1] in operator_list or stack[-2] in operator_list: break
            num_1 = stack.pop()
            num_2 = stack.pop()
            operator = stack.pop()
            calc(num_1, num_2, operator)
        preorder(child[n][0])
        preorder(child[n][1])

for tc in range(10):
    V = int(input())
    child = [[0, 0] for i in range(V + 1)]
    element = [0]
    operator_list = ['+', '-', '*', '/']
    for idx in range(V):
        data = list(map(str, input().split()))
        element.append(int(data[1]) if data[1] not in operator_list else data[1])
        if len(data) == 4:
            child[idx + 1] = [int(data[2]), int(data[3])]
    stack = []   
    print('#{}'.format(tc + 1), end=' ')
    preorder(1)
    print(stack[0])