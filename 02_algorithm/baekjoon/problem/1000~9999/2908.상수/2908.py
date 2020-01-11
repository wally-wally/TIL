import sys
sys.stdin = open('input_2908.txt', 'r')

A, B = map(int, input().split())
reverse_A, reverse_B = int(str(A)[::-1]), int(str(B)[::-1])
print(reverse_A if reverse_A > reverse_B else reverse_B)