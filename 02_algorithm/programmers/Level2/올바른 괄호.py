def solution(parentheses):
    stack = []
    for parent in parentheses:
        if parent == '(':
            stack.append(parent)
        else:
            if len(stack):
                stack.pop()
            else:
                return False
    else:
        return True if not len(stack) else False