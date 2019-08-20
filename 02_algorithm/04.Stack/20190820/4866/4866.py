import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    S = []
    sentence = input()
    result = 1
    for letter in sentence:
        if letter == '(' or letter == '{':
            S.append(letter)
        elif letter == ')':
            if len(S) == 0:
                result = 0
                break
            if S.pop() != '(':
                result = 0
                break
        elif letter == '}':
            if len(S) == 0:
                result = 0
                break
            if S.pop() != '{':
                result = 0
                break
    if S:
        result = 0
    print('#{} {}'.format(a + 1, result))