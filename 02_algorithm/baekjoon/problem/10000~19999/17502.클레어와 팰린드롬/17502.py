import sys
sys.stdin = open('input_17502.txt', 'r')

N = int(input())
string = list(input())
for i in range(N):
    if string[i].isalpha():
        string[-1 - i] = string[i]
for i in range(N):
    if string[i] == '?':
        string[i] = 'a'
print(''.join(string))