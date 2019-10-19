import sys
sys.stdin = open('input_1330.txt', 'r')

A, B = map(int, input().split())
if A < B:
    print('<')
elif A > B:
    print('>')
else:
    print('==')