import sys
sys.stdin = open('input_9012.txt', 'r')

for _ in range(int(input())):
    stack = []
    for data in input():
        if data == '(':
            stack.append(data)
        else:
            if not len(stack):
                print('NO')
                break
            else:
                stack.pop()
    else:
        if not len(stack):
            print('YES')
        else:
            print('NO')