def solution(s):
    answer = 0
    stack = []
    for str in s:
        if len(stack) > 0 and stack[-1] == str:
            stack.pop()
        else:
            stack.append(str)

    return 0 if len(stack) else 1