import sys
sys.stdin = open('input_4949.txt', 'r')

while True:
    data = input()
    stack = []
    if data == '.':
        break
    else:
        result = True
        for elem in data:
            if elem in ['(', '[']:
                stack.append(elem)
            elif elem == ')':
                if len(stack) == 0:
                    result = False
                    break
                if stack[-1] == '(':
                    stack.pop()
                else:
                    result = False
                    break
            elif elem == ']':
                if len(stack) == 0:
                    result = False
                    break
                if stack[-1] == '[':
                    stack.pop()
                else:
                    result = False
                    break
        if len(stack) == 0 and result:
            print('yes')
        else:
            print('no')