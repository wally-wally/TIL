import sys
sys.stdin = open('input_14681.txt')

A = int(input())
B = int(input())
if A > 0 and B > 0:
    print(1)
elif A < 0 and B > 0:
    print(2)
elif A < 0 and B < 0:
    print(3)
else:
    print(4)