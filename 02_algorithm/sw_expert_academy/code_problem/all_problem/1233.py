import sys
sys.stdin = open('input_1233.txt', 'r')

def inorder(n):
    global end_var
    if n != 0:
        inorder(child[n][0])
        stack.append(n)
        if len(stack) >= 2 and type(stack[-1]) == type(stack[-2]) == 'int':
            end_var = 1
        if end_var: return
        inorder(child[n][1])

for tc in range(10):
    V = int(input())
    child = [[0, 0] for i in range(V + 1)]
    element, stack, end_var = [0], [], 0
    for idx in range(V):
        data = list(map(str, input().split()))
        element.append(int(data[1]) if data[1] not in ['+', '-', '*', '/'] else data[1])
        if len(data) == 4:
            child[idx + 1] = [int(data[2]), int(data[3])]
        else:
            if data[1] in ['+', '-', '*', '/']:
                end_var = 1
    print('#{} '.format(tc + 1), end='')
    if end_var:
        print('0')
        continue
    inorder(1)
    print('0' if end_var else '1')