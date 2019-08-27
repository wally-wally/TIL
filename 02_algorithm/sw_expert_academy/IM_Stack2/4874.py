import sys
sys.stdin = open('sample_input_4874.txt', 'r')

T = int(input())

for a in range(T):
    postfix = list(map(str, input().split()))
    result = ''
    stack = []
    for element in postfix:
        if element.isdigit():
            stack.append(int(element))
        elif element in ['+', '-', '*', '/']:
            if not stack or len(stack) == 1:
                result = 'error'
                break
            else:
                x = stack.pop()
                y = stack.pop()
                if element == '+':
                    stack.append(y + x)
                elif element == '-':
                    stack.append(y - x)
                elif element == '*':
                    stack.append(y * x)
                else:
                    stack.append(y // x)
    else:
        if len(stack) >= 2:
            result = 'error'
        else:
            result = str(stack.pop())
    print('#{} {}'.format(a + 1, result))