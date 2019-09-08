import sys
sys.stdin = open('input.txt', 'r')

for a in range(10):
    N = int(input())
    stack = []
    open_brace = ['(', '{', '[', '<']
    close_brace = [')', '}', ']', '>']
    for data in input():
        if data in open_brace:
            stack.append(data)
        elif data in close_brace:
            if not len(stack):
                print('#{} 0'.format(a + 1))
                break
            else:
                pop_element = stack.pop()
                if open_brace.index(pop_element) != close_brace.index(data):
                    print('#{} 0'.format(a + 1))
                    break
    else:
        if len(stack) > 0:
            print('#{} 0'.format(a + 1))
        else:
            print('#{} 1'.format(a + 1))