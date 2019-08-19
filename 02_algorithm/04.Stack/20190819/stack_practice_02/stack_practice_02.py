paren = '()()((()))'

def push(item):
    S.append(item)

def pop(): # pop을 할 때는 항상 empty 상태를 체크한다.
    return S.pop()

def isEmpty(): # 직접 이렇게 함수를 안 만들고 empty 상태를 체크해도 된다.
    return len(S) == 0

for ch in paren:
    if ch == '{':
        push(ch)
    else:
        if isEmpty():
            # 잘못된 표현
            break
        if ')' and pop() != '(':
            # 잘못된 표현
            break
