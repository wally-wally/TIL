import sys

def find():
    s = []
    for i in range(len(code)):
        if code[i]=='+' or code[i]=='-' or code[i]=='/' or code[i]=='*':
            if len(s)>=2:
                op2 = int(s.pop())
                op1 = int(s.pop())
                if code[i]=='+':
                    s.append(op1+op2)
                elif code[i]=='-':
                    s.append(op1-op2)
                elif code[i]=='*':
                    s.append(op1*op2)
                elif code[i]=='/':
                    s.append(op1//op2)
            else:
                return 'error'
        elif code[i]!=' ' and code[i]!='.':
            s.append(code[i])
        elif code[i] == '.':
            if len(s) == 1:
                return s.pop()
            else:
                return 'error'


sys.stdin = open('input.txt', 'r')
T = int(input())

for tc in range(1, T+1):
    code = list(input().split())
    
    print('#{} {}'.format(tc, find()))