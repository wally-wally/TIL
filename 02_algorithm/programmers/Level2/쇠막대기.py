def solution(data):
    stack = []
    piece_count = close_bracket = 0
    for elem in data:
        if not stack and elem == '(':
            stack.append(elem)
            close_bracket = 0
        elif stack[-1] == '(' and elem == '(':
            stack.append(elem)
            close_bracket = 0
        elif not close_bracket and stack[-1] == '(' and elem == ')':
            stack.pop()
            piece_count += len(stack)
            close_bracket = 1
        elif close_bracket and elem == ')':
            stack.pop()
            piece_count += 1
    return piece_count