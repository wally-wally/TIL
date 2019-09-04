import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    data = input()
    stack = [] # 스택
    # 조각난 막대기 개수(piece_count), 닫는 괄호가 레이저 괄호 이후 여러개 나오는 경우(close_bracket)
    piece_count = close_bracket = 0
    for elem in data:
        if not stack and elem == '(':
            stack.append(elem)
            close_bracket = 0
        elif stack[-1] == '(' and elem == '(': # case : ((
            stack.append(elem)
            close_bracket = 0
        elif not close_bracket and stack[-1] == '(' and elem == ')': # case :
            stack.pop()
            piece_count += len(stack)
            close_bracket = 1
            # print(piece_count, end=' ')
        elif close_bracket and elem == ')': # 닫는 괄호가 레이저 괄호 이후 여러개 나오는 경우
            stack.pop()
            piece_count += 1
            # print(piece_count, end=' ')
        # print(stack)
    print('#{} {}'.format(a + 1, piece_count))
        